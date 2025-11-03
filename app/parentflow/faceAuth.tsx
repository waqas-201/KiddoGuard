import { getImageEmbeddingAsync, loadModelAsync } from "@/modules/expo-face-embedder";
import { ParentProfileStore } from "@/storage/parentprofile";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    Camera as VisionCamera,
    useCameraDevice,
    useCameraPermission,
    useFrameProcessor,
} from "react-native-vision-camera";
import { FaceDetectionOptions, useFaceDetector } from "react-native-vision-camera-face-detector";
import { Worklets } from "react-native-worklets-core";

// cosine similarity helper
function cosineSimilarity(a: number[], b: number[]): number {
    const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);
    const normA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
    const normB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));
    return dot / (normA * normB);
}

export default function FaceAuth() {
    const router = useRouter();
    const device = useCameraDevice("front");
    const { hasPermission, requestPermission } = useCameraPermission();
    const cameraRef = useRef<VisionCamera>(null);
    const lastProcessed = useRef(0);
    const [message, setMessage] = useState("Align your face to unlock...");
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<"idle" | "recognizing" | "success" | "failed">("idle");

    const faceOptions: FaceDetectionOptions = {
        performanceMode: "fast",
        landmarkMode: "none",
        classificationMode: "none",
        contourMode: "none",
        minFaceSize: 0.15,
        trackingEnabled: false,
        autoMode: false,
    };

    const { detectFaces, stopListeners } = useFaceDetector(faceOptions);

    useEffect(() => {
        (async () => {
            if (!hasPermission) await requestPermission();
            await loadModelAsync();
            setLoading(false);
            setStatus("idle");
        })();

        return () => stopListeners();
    }, [hasPermission]);

    const handleDetectedFaces = Worklets.createRunOnJS(async (faces: any) => {
        if (faces.length === 0 || status === "recognizing" || status === "success") return;

        setStatus("recognizing");
        setMessage("Analyzing face...");

        try {
            const photo = await cameraRef.current?.takePhoto();
            if (!photo) {
                setStatus("idle");
                return;
            }

            const currentEmbedding = await getImageEmbeddingAsync(photo.path);
            const storedRaw = ParentProfileStore.getString("parentFaceEmbeddings");
            if (!storedRaw) {
                setMessage("No face registered. Please register first.");
                return;
            }

            const storedEmbeddings: number[][] = JSON.parse(storedRaw);
            const similarities = storedEmbeddings.map((emb) =>
                cosineSimilarity(currentEmbedding, emb)
            );
            const maxSim = Math.max(...similarities);
            console.log("🧠 Similarities:", similarities, "Max:", maxSim);

            const threshold = 0.85;
            if (maxSim >= threshold) {
                setStatus("success");
                setMessage("✅ Face recognized!");
                setTimeout(() => router.replace("/(tabs)/kids"), 1200);
            } else {
                setStatus("failed");
                setMessage("❌ Face not recognized. Try again...");
                setTimeout(() => {
                    setStatus("idle");
                    setMessage("Align your face to unlock...");
                }, 2000);
            }
        } catch (err) {
            console.error("Face recognition error:", err);
            setMessage("Error while recognizing face");
            setStatus("failed");
        }
    });

    const frameProcessor = useFrameProcessor((frame) => {
        "worklet";
        const now = Date.now();
        if (now - lastProcessed.current < 2000) return;
        lastProcessed.current = now;

        const faces = detectFaces(frame);
        if (faces.length > 0) {
            Worklets.createRunOnJS(handleDetectedFaces)(faces);
        }
    }, [detectFaces]);

    if (loading || !device)
        return <CenteredMessage message="Loading camera..." />;

    if (!hasPermission)
        return <CenteredMessage message="Camera access required" action={requestPermission} />;

    return (
        <SafeAreaView style={styles.container}>
            <VisionCamera
                ref={cameraRef}
                style={styles.camera}
                device={device}
                isActive={true}
                frameProcessor={frameProcessor}
                photo={true}
            />

            <View style={styles.overlay}>
                <Text style={styles.title}>Face Unlock</Text>
                <Text style={styles.message}>{message}</Text>
                {status === "recognizing" && <ActivityIndicator color="lightgreen" style={{ marginTop: 10 }} />}
            </View>
        </SafeAreaView>
    );
}

const CenteredMessage = ({ message, action }: { message: string; action?: () => void }) => (
    <View style={styles.centered}>
        <Text>{message}</Text>
        {action && <Text onPress={action} style={{ color: "blue" }}>Grant Permission</Text>}
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "black" },
    camera: { ...StyleSheet.absoluteFillObject },
    overlay: {
        position: "absolute",
        bottom: 80,
        width: "100%",
        alignItems: "center",
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 8,
    },
    message: {
        color: "#ccc",
        textAlign: "center",
        fontSize: 14,
        paddingHorizontal: 20,
    },
    centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
