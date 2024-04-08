import React, { Children } from "react";
import { Stack, Tabs } from "expo-router";
import { theme } from "../theme";

export default function StackLayout() {
  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="LocationHome" options={{ headerShown: true }} />
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