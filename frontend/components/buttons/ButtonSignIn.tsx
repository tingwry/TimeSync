import { theme } from "@/app/theme";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { Dimensions, Pressable, View, Text, StyleSheet } from "react-native";

export default function ButtonSignIn() {
  const [fontsLoaded] = useFonts({
    "dm-sans-extrabold": require("@/assets/fonts/DMSans-ExtraBold.ttf"),
  });

  return (
    <Link
      push
      href={"/SignIn"}
      asChild
      style={[styles.container, styles.shadowProp]}
    >
      <Pressable style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Sign in with existing account</Text>
      </Pressable>
    </Link>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    marginBottom: 24,
    width: "100%",
    alignItems: "center",
  },
  buttonStyle: {
    width: screenWidth - 64, // Adjusting width considering left and right margin of 32
    height: 48,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.textPrimary,
  },
  buttonText: {
    fontFamily: "dm-sans-extrabold",
    color: theme.colors.textPrimary,
    fontSize: 16,
  },
  shadowProp: {
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});
