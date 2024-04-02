import { View, Text, StyleSheet, Image, StatusBar } from "react-native";
import React from "react";
import { theme } from "../theme";
import { useFonts } from "expo-font";
import CardNewSchedule from "@/components/CardNewSchedule";
import AlarmClock from "../src/AlarmClock";
// import CardCountDownTimer from "@/components/CardCountDownTimer";
// import PopUpCountdownTimer from "../src/PopUpCountDownTimer";

export default function Home() {
  const [fontsLoaded] = useFonts({
    "dm-sans-medium": require("../../assets/fonts/DMSans-Medium.ttf"),
    "dm-sans-extrabold": require("../../assets/fonts/DMSans-ExtraBold.ttf"),
    "dm-sans-semibold": require("../../assets/fonts/DMSans-SemiBold.ttf"),
    "dm-sans-regular": require("../../assets/fonts/DMSans-Regular.ttf"),
    "dm-sans-bold": require("../../assets/fonts/DMSans-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.background}>
      <StatusBar barStyle="light-content" />
      <View style={styles.containerHome}>
        <Text style={styles.textTitle}>Hello, User</Text>
        <Text style={styles.textCaption}>Let's see what is up next!</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textHeader}>Upcoming Schedule</Text>
        {/* <CardCountDownTimer /> */}
        <CardNewSchedule />
      </View>

      <AlarmClock />
      {/* <PopUpCountdownTimer /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: theme.colors.bluePrimary,
    color: theme.colors.textPrimary,
  },
  container: {
    marginLeft: 24,
    marginRight: 24,
    marginTop: 50,
  },
  containerHome: {
    marginLeft: 24,
    marginRight: 24,
    marginTop: 100,
  },
  textTitle: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-extrabold",
    fontSize: 36,
    paddingLeft: 8,
  },
  textCaption: {
    color: theme.colors.textCaption,
    fontFamily: "dm-sans-regular",
    fontSize: 16,
    paddingLeft: 8,
  },
  textHeader: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-semibold",
    fontSize: 20,
    paddingLeft: 8,
    paddingBottom: 24,
  },
});
