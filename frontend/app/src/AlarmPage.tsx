import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../theme";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { router, Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Set to false for 24-hour format
  });

  const handleClickStop = () => {
    // await AsyncStorage.setItem("turnOff", "true");

    // Store a flag or state indicating that the countdown should start in the Home screen
    AsyncStorage.setItem("startCountdown", "true");

    router.push("/Home");
    // router.replace("/Home");

    // AsyncStorage.getItem("startCountDown")
    //   .then((startCountdownValue) => {
    //     console.log(startCountdownValue);
    //   })
    //   .catch((error) => {
    //     console.error("Error retrieving startCountdown value:", error);
    //   });
  };

  return (
    <View style={styles.background}>
      <LinearGradient
        colors={["rgba(24, 38, 64, 1)", "rgba(38, 61, 102, 1)"]}
        style={styles.background}
      >
        <Text style={styles.textTitle}>Alarm</Text>
        <Text style={styles.timer}>{formattedTime}</Text>
        {/* <Pressable
          onPress={() => router.push("/Home")}
          style={[styles.buttonContainer, styles.shadowProp]}
        > */}
        <Link href="/Home">
          <LinearGradient
            colors={["#CF7B04", "#EDA33C"]}
            style={styles.buttonStyle}
          >
            <View>
              <Text onPress={handleClickStop} style={styles.buttonText}>
                Stop
              </Text>
            </View>
          </LinearGradient>
        </Link>
        {/* </Pressable> */}
      </LinearGradient>
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // backgroundColor: theme.colors.bluePrimary,
    color: theme.colors.textPrimary,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  textTitle: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-regular",
    fontSize: 36,
    marginBottom: 30,
  },
  timer: {
    fontSize: 84,
    fontWeight: "bold",
    color: "#FEFEFE",
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonStyle: {
    width: screenWidth - 160, // Adjusting width considering left and right margin of 32
    height: 48,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "dm-sans-extrabold",
    color: theme.colors.textPrimary,
    fontSize: 24,
  },
  shadowProp: {
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});
