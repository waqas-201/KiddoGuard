import { getImageEmbeddingAsync, initModelAsync } from "@/modules/expo-face-embedder";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Button, Image, ScrollView, Text, View } from "react-native";

export default function FaceEmbedderScreen() {
    const [embeddings, setEmbeddings] = useState<number[] | null>(null);
    const [imageUri, setImageUri] = useState<string | null>(null);

    const handlePick = async () => {
        // ✅ Request permissions
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Permission required to access gallery");
            return;
        }

        // ✅ Launch picker (new syntax)
        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'], // ✅ FIXED
            allowsEditing: true,
            quality: 1,
        });

        if (!res.canceled) {
            const uri = res.assets[0].uri;
            setImageUri(uri);
            console.log("✅ Selected image URI:", uri);

            // ✅ Initialize model once before running inference
            await initModelAsync("mobile_face_net.tflite");

            // ✅ Get embedding from native module
            const result = await getImageEmbeddingAsync(uri);
            setEmbeddings(result);
            console.log("✅ Embedding received:", result.length);
        }
    };

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
            }}
        >
            <Button title="Pick Image & Get Embedding" onPress={handlePick} />

            {imageUri && (
                <View style={{ marginTop: 20 }}>
                    <Image
                        source={{ uri: imageUri }}
                        style={{ width: 200, height: 200, borderRadius: 10 }}
                    />
                </View>
            )}

            {embeddings && (
                <>
                    <Text style={{ marginTop: 20 }}>
                        Got {embeddings.length}-dim embedding:
                    </Text>
                    <Text selectable>{JSON.stringify(embeddings.slice(0, 10))} ...</Text>
                </>
            )}
        </ScrollView>
    );
}
