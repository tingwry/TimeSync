import { theme } from "@/app/theme";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { StyleSheet, Text, Dimensions, View, Pressable } from "react-native";

export interface ButtonPrimaryProps {
  text: string;
  linkName: any;
}

export default function ButtonPrimaryLink(props: ButtonPrimaryProps) {
  const [fontsLoaded] = useFonts({
    "dm-sans-extrabold": require("@/assets/fonts/DMSans-ExtraBold.ttf"),
  });

  return (
    <Link push href={props.linkName} asChild style={[styles.container, styles.shadowProp]}>
      <Pressable>
        <LinearGradient
          colors={["#CF7B04", "#EDA33C"]}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonText}>{props.text}</Text>
        </LinearGradient>
      </Pressable>
    </Link>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 44,
    width: "100%",
    alignItems: "center",
  },
  buttonStyle: {
    width: screenWidth - 64, // Adjusting width considering left and right margin of 32
    height: 48,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
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
