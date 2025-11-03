
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#1c261e", // same as kid cards
                    borderTopColor: "#29382c",
                },
                tabBarActiveTintColor: "#00e054",
                tabBarInactiveTintColor: "#a0b8a4",
            }}
        >
            <Tabs.Screen name="kids" options={{ title: "Kids", headerShown: false }} />
            <Tabs.Screen name="settings" options={{ title: "Settings" }} />
        </Tabs>
    );
}
