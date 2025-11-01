// app/onboarding/Onboarding.tsx
import { useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Onboarding() {
    const theme = useTheme();
    const router = useRouter();


    

   

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
            <View style={styles.contentContainer}>
                <Image
                    source={require("../assets/images/Onboarding.png")}
                    style={styles.image}
                />

                <Text variant="headlineLarge" style={styles.heading}>
                    Safe & Sound Screen Time
                </Text>

                <Text
                    variant="bodyMedium"
                    style={[styles.tagline, { color: theme.colors.onSurfaceVariant }]}
                >
                    KiddoGuard helps you create a secure digital space for your child.
                </Text>
            </View>

            <Button
                mode="contained"
                onPress={() => router.navigate("/ParentProfile")}
                style={[styles.button, { borderRadius: theme.roundness * 2 }]}
                labelStyle={{ fontFamily: "Poppins-SemiBold" }} // Ensures CTA text feels premium
            >
                Get Started
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        padding: 16,
        justifyContent: "space-between",
        alignItems: "center",
    },
    contentContainer: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        width: "100%",
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
        marginTop: 20,
    },
    tagline: {
        textAlign: "center",
        marginTop: 16,
        lineHeight: 22,
        paddingHorizontal: 24,
    },
    button: {
        width: "100%",
        marginBottom: 16,
    },
});
