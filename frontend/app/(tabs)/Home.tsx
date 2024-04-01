import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { theme } from "../theme";
import { useFonts } from "expo-font";
import { useAuth } from "../context/authContext";

export default function Home() {
  const auth = useAuth();
  const signOut = () => {
      console.log('Sign Out')
      auth.signOut();
  }

  const [fontsLoaded] = useFonts({
    "dm-sans-medium": require("../../assets/fonts/DMSans-Medium.ttf"),
    "dm-sans-extrabold": require("../../assets/fonts/DMSans-ExtraBold.ttf"),
    "dm-sans-semibold": require("../../assets/fonts/DMSans-SemiBold.ttf"),
    "dm-sans-regular": require("../../assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.text_title}>Hello, User</Text>
        <Text style={styles.text_caption}>Let's see what is up next!</Text>
        <Button title="Sign Out" onPress={signOut} />
      </View>
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
    marginTop: 100,
  },
  text_title: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-extrabold",
    fontSize: 36,
  },
  text_caption: {
    color: theme.colors.textCaption,
    fontFamily: "dm-sans-regular",
    fontSize: 16,
  },
});
