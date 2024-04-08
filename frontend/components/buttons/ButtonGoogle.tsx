import React from "react";
import { theme } from "@/app/theme";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { StyleSheet, Text, Dimensions, View, Pressable, Image } from "react-native";

export interface ButtonGoogleProps {
  onPress: () => void;
}

export default function ButtonGoogle(props: ButtonGoogleProps) {
  const [fontsLoaded] = useFonts({
    "dm-sans-extrabold": require("@/assets/fonts/DMSans-ExtraBold.ttf"),
  });

  return (
    <Pressable style={[styles.container, styles.shadowProp]}>
      <View
        style={styles.buttonStyle}
      >
        <Image source={require("@/assets/icons/google.png")} style={{width: 32, height: 32}} />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </View>
    </Pressable>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    // bottom: 44,
    width: "100%",
    alignItems: "center",
    // backgroundColor: theme.colors.yellow,
  },
  buttonStyle: {
    width: screenWidth - 64, // Adjusting width considering left and right margin of 32
    height: 48,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.textPrimary,
    flexDirection: "row",
    gap: 16
  },
  buttonText: {
    fontFamily: "dm-sans-semibold",
    color: theme.colors.black,
    fontSize: 16,
  },
  shadowProp: {
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});