import { Stack } from "expo-router";
import { theme } from "../theme";
import React from "react";

export default function StackLayout() {
  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen
        name="ViewAllSchedule"
        options={{ headerShown: false, presentation: "modal" }}
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
