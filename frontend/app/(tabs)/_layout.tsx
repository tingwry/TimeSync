import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Redirect, Tabs } from "expo-router";
import { theme } from "../theme";
import { useAuth } from "../context/authContext";

export default () => {
  const auth= useAuth();

  if (!auth.authData) {
    return <Redirect href="/signInScreen" />;
  }

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
