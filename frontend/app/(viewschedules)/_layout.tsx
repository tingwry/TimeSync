import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AllSchedule from "./ViewAllSchedule";
import CardScheduleDetail from "@/components/CardUpcomingSchedule";
import { Stack } from "expo-router";
import { theme } from "../theme";

export default function StackLayout() {
  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen
        name="NewScheduleSheet"
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
