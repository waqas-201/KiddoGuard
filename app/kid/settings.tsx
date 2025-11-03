import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function KidSettingsScreen() {
     const theme = useTheme();
     const router = useRouter()

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        router.push('/(tabs)/kids')
                        
                   }}
                    style={styles.backButton}>
                    <Text style={styles.backIcon}>

                        <Ionicons name="arrow-back" size={24} color="black" />

                    </Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Kid Settings</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Profile */}
                <View style={styles.profileContainer}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={{
                                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgQQrt5AmLI2WzYelJpBX9cY79cVWdk9IvGzL_A_N8dE3x1espUouhR2-ViQ82X5FQX-Ui3l6DUvCnl-U3IFGDk-IYzYDvcmPjMe9yasqIR3ZCgArzOQ2A4ktWF7fgQfP6KXkDFY5KebMUL4EKBdIuEF-XSntEpKdXQuJm5F2PWh6PicT61FrHea1MRMpr4MmQkIoUjLAQWbZEDOgfmcUq-T0isHYxLCgiEmLZ-5uZYpwNhVgV7N4KwnankGvSFgMmzuZhQikcWx4",
                            }}
                            style={styles.avatar}
                        />
                    </View>
                    <Text style={styles.kidName}>Ayesha Khan</Text>
                    <Text style={styles.kidAge}>Age 7</Text>
                </View>

                {/* Settings Cards */}
                <View style={styles.cardsContainer}>
                    {[
                        { title: "Daily Time Cap", subtitle: "2 hours", icon: "⏳" },
                        { title: "Allowed Apps", subtitle: "12 apps", icon: "📱" },
                        { title: "Face Authentication", subtitle: "Enabled", icon: "😃" },
                    ].map((item, index) => (
                        <TouchableOpacity key={index} style={styles.card}>
                            <View style={styles.cardLeft}>
                                <View style={styles.cardIconWrapper}>
                                    <Text style={styles.cardIcon}>{item.icon}</Text>
                                </View>
                                <View>
                                    <Text style={styles.cardTitle}>{item.title}</Text>
                                    <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                                </View>
                            </View>
                            <Text style={styles.cardChevron}>›</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Remove Button */}
            <View style={styles.footer}>
                <Button
                    mode="contained"
                    buttonColor="#FEE2E2"
                    textColor="#B91C1C"
                    style={styles.removeButton}
                    icon="delete"
                    onPress={() => { }}
                >
                    Remove Kid Profile
                </Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F9FAFB" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#FFF",
        elevation: 2,
    },
    backButton: {
        padding: 8,
        borderRadius: 24,
        marginRight: 8,
    },
    backIcon: { fontSize: 20, color: "#374151" },
    headerTitle: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "bold", color: "#111827", marginRight: 32 },
    scrollContainer: { padding: 24 },
    profileContainer: { alignItems: "center", marginBottom: 32 },
    avatarWrapper: {
        borderWidth: 4,
        borderColor: "#FFF",
        borderRadius: 64,
        overflow: "hidden",
        marginBottom: 16,
    },
    avatar: { width: 128, height: 128, borderRadius: 64 },
    kidName: { fontSize: 24, fontWeight: "bold", color: "#111827" },
    kidAge: { fontSize: 16, color: "#6B7280", marginTop: 4 },
    cardsContainer: { gap: 16 },
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 16,
        elevation: 1,
    },
    cardLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
    cardIconWrapper: {
        backgroundColor: "#DCFCE7",
        padding: 12,
        borderRadius: 24,
    },
    cardIcon: { fontSize: 20, color: "#16A34A" },
    cardTitle: { fontSize: 16, fontWeight: "600", color: "#111827" },
    cardSubtitle: { fontSize: 14, color: "#6B7280", marginTop: 2 },
    cardChevron: { fontSize: 18, color: "#9CA3AF" },
    footer: { padding: 16 },
    removeButton: { borderRadius: 16, height: 48, justifyContent: "center" },
});
