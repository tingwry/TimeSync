import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { theme } from "../theme";

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.backgroundNavbar,
          height: 100,
        },
      }}
    >
      <Tabs.Screen name="Home" options={{ headerShown: false }} />
      <Tabs.Screen name="list" />
    </Tabs>
  );
};

const screenOptions = {
  tabBarStyle: {
    backgroundColor: theme.colors.backgroundNavbar,
    height: 100,
  },
  tabBarItemStyle: {
    backgroundColor: "#00ff00",
    margin: 5,
    borderRadius: 10,
  },
};
