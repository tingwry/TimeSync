import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "dm-sans-medium": require("./assets/fonts/DMSans-Medium.ttf"),
    "dm-sans-extrabold": require("./assets/fonts/DMSans-ExtraBold.ttf"),
    "dm-sans-semibold": require("./assets/fonts/DMSans-SemiBold.ttf"),
    "dm-sans-regular": require("./assets/fonts/DMSans-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <LinearGradient colors={["#182640", "#263D66"]} style={styles.container}>
      <Image
        source={require("./assets/logo-inapp.png")}
        style={{ width: 196, height: 196 }}
      />
      <Text style={styles.text_welcome}>Welcome to</Text>
      <Text style={styles.text_logo}>TimeSync</Text>
      <Text style={styles.text_slogan}>Your Time Management Assistant</Text>

      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  text_logo: {
    fontFamily: "dm-sans-extrabold",
    color: "#FEFEFE",
    fontSize: 52,
  },
  text_welcome: {
    fontFamily: "dm-sans-semibold",
    color: "#FEFEFE",
    fontSize: 24,
    paddingTop: 48,
  },
  text_slogan: {
    fontFamily: "dm-sans-medium",
    color: "#BFBFBF",
    fontSize: 16,
  },
});
