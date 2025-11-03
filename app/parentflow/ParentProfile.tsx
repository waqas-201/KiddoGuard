// app/onboarding/ParentProfileSetup.tsx

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ParentProfileSetup() {
    const theme = useTheme();
    const router = useRouter();

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.push("/parentflow/onboarding")}
                    style={styles.backButton}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={theme.colors.onSurface}
                    />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.contentContainer}>
                <Image
                    source={require("../../assets/images/Onboarding.png")}
                    style={styles.image}
                />

                <Text variant="headlineLarge" style={styles.heading}>
                    Create your parent profile
                </Text>

                <Text
                    variant="bodyMedium"
                    style={[styles.tagline, { color: theme.colors.onSurfaceVariant }]}
                >
                    Face authentication keeps your profile secure. No data is stored
                    outside your device.
                </Text>
            </View>

            {/* CTA */}
            <Button
                mode="contained"
                onPress={() => {
                    router.push("/parentflow/nameAndGenderSetup")
                }}
                style={[styles.button, { borderRadius: theme.roundness * 2 }]}
                labelStyle={{ fontFamily: "Poppins-SemiBold" }}
            >
                Continue
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        padding: 16,
        justifyContent: "space-between",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    backButton: {
        padding: 8,
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 16,
    },
    image: {
        width: "100%",
        height: undefined,
        aspectRatio: 1.2, // responsive scaling
        resizeMode: "contain",
        marginBottom: 20,
    },
    heading: {
        textAlign: "center",
        marginBottom: 12,
    },
    tagline: {
        textAlign: "center",
        marginTop: 8,
        lineHeight: 22,
        paddingHorizontal: 24,
    },
    button: {
        width: "100%",
        marginBottom: 16,
    },
});
