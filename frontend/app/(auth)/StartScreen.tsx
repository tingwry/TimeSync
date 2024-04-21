import React from "react";
import { Redirect, Link } from "expo-router";
import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import ButtonPrimaryLink from "@/components/buttons/ButtonPrimaryLink";
import { theme } from "../theme";
import ButtonSignIn from "@/components/buttons/ButtonSignIn";

export default function StartScreen() {
  const [fontsLoaded] = useFonts({
    "dm-sans-medium": require("@/assets/fonts/DMSans-Medium.ttf"),
    "dm-sans-extrabold": require("@/assets/fonts/DMSans-ExtraBold.ttf"),
    "dm-sans-semibold": require("@/assets/fonts/DMSans-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <LinearGradient colors={["#182640", "#263D66"]} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.contentView}>
        <Image
          source={require("@/assets/images/logo-inapp.png")}
          style={{ width: 196, height: 196 }}
        />
        <Text style={styles.textWelcome}>Welcome to</Text>
        <Text style={styles.text_logo}>TimeSync</Text>
        <Text style={styles.text_slogan}>Your time management assistant</Text>
      </View>

      <View style={styles.footer}>
        <ButtonSignIn />
        <ButtonPrimaryLink
          text={"Get Started"}
          linkName={"/onboarding/Onboarding1"}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text_logo: {
    fontFamily: "dm-sans-extrabold",
    color: theme.colors.textPrimary,
    fontSize: 52,
  },
  textWelcome: {
    fontFamily: "dm-sans-semibold",
    color: theme.colors.textPrimary,
    fontSize: 24,
    paddingTop: 50,
  },
  text_slogan: {
    fontFamily: "dm-sans-medium",
    color: theme.colors.textCaption,
    fontSize: 16,
  },
  footer: {
    justifyContent: "flex-end",
    flex: 1,
    flexDirection: "column",
    gap: 16,
    bottom: 44,
  },
  contentView: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 156,
  },
});
