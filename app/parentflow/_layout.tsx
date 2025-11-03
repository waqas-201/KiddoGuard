
import { ParentProfileStore } from "@/storage/parentprofile";
import { MyTheme } from "@/theme";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {
    // ParentProfileStore.clearAll()
    const router = useRouter();

    const name = ParentProfileStore.getString("parentName");
    const gender = ParentProfileStore.getString("parentGender");
    const embeddingsRaw = ParentProfileStore.getString("parentFaceEmbeddings");
    const embeddings = embeddingsRaw ? JSON.parse(embeddingsRaw) : [];

    console.log("RootLayout - parentName:", name);
    console.log("RootLayout - parentGender:", gender);
    console.log("RootLayout - parentFaceEmbeddings:", embeddings.length);

    // 👇 check profile completeness & redirect
    useEffect(() => {
        if (name && gender && embeddings.length === 3) {
            console.log("✅ Parent profile complete — redirecting to recognizeFace...");
            router.replace("/parentflow/faceAuth");
        }
    }, [name, gender, embeddings.length]);

    return (
        <PaperProvider theme={MyTheme}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="onboarding" />
                <Stack.Screen name="nameAndGenderSetup" />
                <Stack.Screen name="secureAccountSetup" />
                <Stack.Screen name="ParentProfile" />
                <Stack.Screen name="recognizeFace" /> 
            </Stack>
        </PaperProvider>
    );
}
