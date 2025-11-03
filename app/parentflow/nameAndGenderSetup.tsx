// app/profile/NameAndGenderSetup.tsx
import { ParentProfileStore } from "@/storage/parentprofile";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useMMKVString } from "react-native-mmkv";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NameAndGenderSetup() {
    const theme = useTheme();
    const router = useRouter();
    // ✅ Reactive MMKV bindings
    const [name, setName] = useMMKVString("parentName", ParentProfileStore);
    const [gender, setGender] = useMMKVString("parentGender", ParentProfileStore);



    const handleNext = () => {
        // Data already persisted, just navigate
        router.push("/parentflow/secureAccountSetup");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.navigate("/parentflow/ParentProfile")}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.heading} variant="headlineLarge">
                    What's your name?
                </Text>

                <Text
                    style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
                >
                    Please enter your full name.
                </Text>

                {/* 🔹 Name input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Name</Text>
                    <TextInput
                        mode="outlined"
                        placeholder="e.g. Ali Ahmed"
                        value={name ?? ""}
                        onChangeText={setName}
                        style={styles.nameInput}
                        outlineColor={theme.colors.outline}
                        activeOutlineColor={theme.colors.primary}
                    />
                </View>

                {/* 🔹 Gender selection */}
                <View style={styles.genderSelectionContainer}>
                    <Text style={styles.inputLabel}>What's your gender?</Text>
                    <View style={styles.genderButtons}>
                        <TouchableOpacity
                            style={[
                                styles.genderButton,
                                gender === "Male" && styles.selectedGenderButton,
                                {
                                    borderColor: theme.colors.outline,
                                    backgroundColor:
                                        gender === "Male"
                                            ? theme.colors.primaryContainer
                                            : theme.colors.background,
                                },
                            ]}
                            onPress={() => setGender("Male")}
                        >
                            <Text
                                style={[
                                    styles.genderButtonText,
                                    {
                                        color:
                                            gender === "Male"
                                                ? theme.colors.onPrimaryContainer
                                                : theme.colors.onBackground,
                                    },
                                ]}
                            >
                                Male
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.genderButton,
                                gender === "Female" && styles.selectedGenderButton,
                                {
                                    borderColor: theme.colors.outline,
                                    backgroundColor:
                                        gender === "Female"
                                            ? theme.colors.primaryContainer
                                            : theme.colors.background,
                                },
                            ]}
                            onPress={() => setGender("Female")}
                        >
                            <Text
                                style={[
                                    styles.genderButtonText,
                                    {
                                        color:
                                            gender === "Female"
                                                ? theme.colors.onPrimaryContainer
                                                : theme.colors.onBackground,
                                    },
                                ]}
                            >
                                Female
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <Button
                mode="contained"
                onPress={handleNext}
                style={styles.nextButton}
                disabled={!name || !gender}
            >
                Next
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        padding: 16,
        backgroundColor: "white",
        justifyContent: "space-between",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: 20,
    },
    backButton: {
        padding: 8,
    },
    contentContainer: {
        flex: 1,
        width: "100%",
    },
    heading: {
        fontWeight: "600",
        fontSize: 30,
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 30,
    },
    inputGroup: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 8,
        color: "black",
    },
    nameInput: {
        height: 60,
        fontSize: 18,
        backgroundColor: "white",
    },
    genderSelectionContainer: {},
    genderButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    genderButton: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: "center",
        marginHorizontal: 4,
    },
    selectedGenderButton: {},
    genderButtonText: {
        fontSize: 16,
        fontWeight: "500",
    },
    nextButton: {
        width: "100%",
        marginBottom: 16,
    },
});
