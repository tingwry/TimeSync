import { View, Text, StyleSheet, Image } from "react-native";
import React, { Children } from "react";
import { Stack, Tabs } from "expo-router";
import { theme } from "../theme";
import { useFonts } from "expo-font";

export default function StackLayout() {
  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen
        name="Onboarding1"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="Onboarding2"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="Onboarding3"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="Loading"
        options={{ headerShown: false, animation: "fade" }}
      />
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
