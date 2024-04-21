import React, { Children } from "react";
import { Stack, Tabs } from "expo-router";
import { theme } from "../theme";

export default function StackLayout() {
    return (
        <Stack screenOptions={screenOptions}>
            <Stack.Screen name="Account" options={{ headerShown: false }} />
            <Stack.Screen name="EditAccount" options={{ headerShown: false }} />
            <Stack.Screen name="EditUsername" options={{ headerShown: false }} />
            <Stack.Screen name="ResetPassword" options={{ headerShown: false }} />
            <Stack.Screen name="Locations" options={{ headerShown: false }} />
            <Stack.Screen name="Preparation" options={{ headerShown: false }} />
            <Stack.Screen name="Alarm" options={{ headerShown: false }} />
            <Stack.Screen name="General" options={{ headerShown: false }} />
            <Stack.Screen name="Notification" options={{ headerShown: false }} />
        </Stack>
    );
}

const screenOptions = {
    tabBarStyle: {
        backgroundColor: theme.colors.backgroundNavbar,
        height: 100,
        borderTopColor: theme.colors.blueSecondary,
    },
    tabBarShowLabel: false,
    headerShown: false,
};