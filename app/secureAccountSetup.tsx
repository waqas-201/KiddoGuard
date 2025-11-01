import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera as VisionCamera, useCameraDevice, useCameraPermission, useFrameProcessor } from "react-native-vision-camera";
import { FaceDetectionOptions, useFaceDetector } from 'react-native-vision-camera-face-detector';
import { Worklets } from "react-native-worklets-core";

// Custom module imports
import { getImageEmbeddingAsync, loadModelAsync, logImageUriAsync } from '@/modules/expo-face-embedder';

export default function ParentFaceScan() {
    // -------------------
    // Camera + permissions
    // -------------------
    const device = useCameraDevice("front");
    const { hasPermission, requestPermission } = useCameraPermission();
    const cameraRef = useRef<VisionCamera>(null);

    // -------------------
    // Face detection options
    // -------------------
    const faceDetectionOptions = useRef<FaceDetectionOptions>({
        performanceMode: 'fast',
        landmarkMode: 'none',
        classificationMode: 'none',
        contourMode: 'none',
        minFaceSize: 0.15,
        trackingEnabled: false,
        autoMode: false,
    }).current;

    // -------------------
    // Face detector
    // -------------------
    const { detectFaces, stopListeners } = useFaceDetector(faceDetectionOptions);

    // -------------------
    // Effect: request camera permission
    // -------------------
    useEffect(() => {
        if (!hasPermission) requestPermission();
    }, [hasPermission]);

    // -------------------
    // Effect: clean up detector
    // -------------------
    useEffect(() => {
        return () => stopListeners();
    }, []);

    // -------------------
    // Async function: capture photo
    // -------------------
    const captureFacePhoto = async () => {
        try {
            const photo = await cameraRef.current?.takePhoto();
            if (photo) {
                console.log("✅ Photo captured:", photo.path);
                await logImageUriAsync(photo.path);
                await loadModelAsync();
              const embeddings =   await getImageEmbeddingAsync(photo.path);
              console.log("✅ Image embeddings:", embeddings);
              
            }
        } catch (err) {
            console.error("❌ Photo capture error:", err);
        }
    };

    // -------------------
    // JS callback for detected faces
    // -------------------
    const handleDetectedFaces = Worklets.createRunOnJS((faces: any) => {
        console.log("faces detected", faces);
        captureFacePhoto();
    });

    // -------------------
    // Frame processor (UI thread)
    // -------------------
    const lastProcessed = useRef(0);
    const frameProcessor = useFrameProcessor((frame) => {
        'worklet';
        const now = Date.now();
        if (now - lastProcessed.current < 3000) return; // throttle every 3s
        lastProcessed.current = now;

        const faces = detectFaces(frame);
        if (faces.length > 0) {
            Worklets.createRunOnJS(handleDetectedFaces)(faces);
        }
    }, [detectFaces]);

    // -------------------
    // Early returns for loading / permission
    // -------------------
    if (!device) return <CenteredMessage message="Loading camera..." />;
    if (!hasPermission) return <CenteredMessage message="No camera permission" action={requestPermission} />;

    // -------------------
    // Render camera view
    // -------------------
    return (
        <SafeAreaView style={styles.container}>
            <VisionCamera
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                frameProcessor={frameProcessor}
                photo={true}
            />
        </SafeAreaView>
    );
}

// -------------------
// Reusable centered message component
// -------------------
const CenteredMessage = ({ message, action }: { message: string; action?: () => void }) => (
    <View style={styles.centered}>
        <Text>{message}</Text>
        {action && <Button onPress={action}>Grant Permission</Button>}
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
