import { View, Text, StyleSheet, Image } from "react-native";
import React, { Children } from "react";
import { Tabs } from "expo-router";
import { theme } from "../theme";
import { useFonts } from "expo-font";
import ButtonNewSchedule from "@/components/buttons/ButtonNewSchedule";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";

export default function RootLayoutNav() {
  const [fontsLoaded] = useFonts({
    "dm-sans-medium": require("@/assets/fonts/DMSans-Medium.ttf"),
    "dm-sans-extrabold": require("@/assets/fonts/DMSans-ExtraBold.ttf"),
    "dm-sans-semibold": require("@/assets/fonts/DMSans-SemiBold.ttf"),
    "dm-sans-regular": require("@/assets/fonts/DMSans-Regular.ttf"),
    "dm-sans-bold": require("@/assets/fonts/DMSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 12,
                }}
              >
                <Image
                  source={
                    focused
                      ? require("@/assets/icons/home-nav-fill.png")
                      : require("@/assets/icons/home-nav.png")
                  }
                  style={{ width: 32, height: 32 }}
                />
                <Text
                  style={focused ? styles.tabBarTextFocused : styles.tabBarText}
                >
                  Home
                </Text>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="NewSchedule"
        options={{
          title: "NewSchedule",
          tabBarIcon: () => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  top: -14,
                }}
              >
                <ButtonNewSchedule />
                <Text style={styles.tabBarText}>New Schedule</Text>
              </View>
            );
          },
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("(newschedule)");
          },
        })}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: "list",
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 12,
                }}
              >
                <Image
                  source={
                    focused
                      ? require("@/assets/icons/user-nav-fill.png")
                      : require("@/assets/icons/user-nav.png")
                  }
                  style={{ width: 32, height: 32 }}
                />
                <Text
                  style={focused ? styles.tabBarTextFocused : styles.tabBarText}
                >
                  More
                </Text>
              </View>
            );
          },
        }}
      />
    </Tabs>
    
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

const styles = StyleSheet.create({
  tabBarTextFocused: {
    fontFamily: "dm-sans-bold",
    color: theme.colors.textPrimary,
    fontSize: 14,
    paddingTop: 8,
  },
  tabBarText: {
    fontFamily: "dm-sans-medium",
    color: theme.colors.textPrimary,
    fontSize: 14,
    paddingTop: 8,
  },
});
