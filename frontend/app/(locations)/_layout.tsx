import React, { Children } from "react";
import { Stack, Tabs } from "expo-router";
import { theme } from "../theme";

export default function StackLayout() {
  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="LocationHome" options={{ headerShown: false }} />
      <Stack.Screen name="MapLocation" options={{ headerShown: false }} />
      <Stack.Screen name="AddNewLocation" options={{ headerShown: false }} />
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