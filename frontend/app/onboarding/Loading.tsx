import { Redirect, Link } from "expo-router";
import { StyleSheet, Text, View, Image, StatusBar, Button, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { theme } from "../theme";
import ButtonPrimary from "@/components/ButtonPrimary";
import React from "react";
import { router } from "expo-router";

export default function Onboard1() {
  const [fontsLoaded] = useFonts({
    "dm-sans-medium": require("@/assets/fonts/DMSans-Medium.ttf"),
    "dm-sans-extrabold": require("@/assets/fonts/DMSans-ExtraBold.ttf"),
    "dm-sans-semibold": require("@/assets/fonts/DMSans-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    // <TouchableOpacity onPress={() => router.push("/onboarding/Onboarding1")} style={styles.btnOutline}>
    //       <Image source={require('@/assets/icons/chevron-left.png')} style={styles.btnIconArrowLeft} />
    //       <Text style={styles.smallmore}>More</Text>
    //     </TouchableOpacity>
    <LinearGradient colors={["#182640", "#263D66"]} style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* <TouchableOpacity onPress={() => router.push("/onboarding/Onboarding3")} style={styles.btnOutline}>
          <Text style={styles.skip}>Skip</Text>
          <Image source={require('@/assets/icons/chevron-right.png')} style={styles.btnIconArrowRight} />
        </TouchableOpacity> */}
        <View>
      <Image
        source={require("@/assets/images/loadpic.png")}
        style={{ width: 260, height: 260, bottom:45}}
      />
      {/* {"\n"}  */}
      </View>
      <Text style={styles.text_wakeup}>You are all set!</Text>
      <Text style={styles.text_slogan}>We are preparing for your best experience. {"\n"}Your journey is about to begin!</Text>
       <View style={{ height: 3, backgroundColor: theme.colors.textPrimary}} />
    
    
    </LinearGradient>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  text_wakeup: {
    bottom:20,
    fontFamily: "dm-sans-extrabold",
    color: theme.colors.textPrimary,
    textAlign:'center',
    fontSize: 32,
  },
  text_slogan: {
    fontFamily: "dm-sans-medium",
    color: theme.colors.textCaption,
    fontSize: 16,
    paddingTop: 15,
    textAlign:'center',
    lineHeight: 28,
  },
  btnText: {
    position:'absolute',
    color: theme.colors.textPrimary,
    fontSize:16,
    fontFamily:'dm-sans-medium',
    right:49,
    top:100,
},

});