import { Redirect, Link } from "expo-router";
import { StyleSheet, Text, View, Image, StatusBar, Button, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { theme } from "../theme";
import ButtonPrimary from "@/components/ButtonPrimary";
import React from "react";
import { router } from "expo-router";

export default function Onboard3() {
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
      <TouchableOpacity onPress={() => router.push("/onboarding/Onboarding2")} style={styles.btnOutline}>
          <Image source={require('@/assets/icons/chevron-left.png')} style={styles.btnIconArrowLeft} />
          <Text style={styles.smallmore}>Previous</Text>
        </TouchableOpacity>
      <Image
        source={require("@/assets/images/onboard-pic-3.png")}
        style={{ width: 342, height: 337, bottom:45}}
      />
      <Text style={styles.text_wakeup}>Get ready and leave home just on time</Text>
      <Text style={styles.text_slogan}>Our ML has traffic and weather integration, {"\n"}so you don’t have to worry about them. {"\n"}We have already take care of them for you.
       </Text>
       <View style={{ height: 3, backgroundColor: theme.colors.textPrimary}} />
       <View style={styles.screenIndicator}>
        <View style={styles.dot1} />
        <View style={styles.dot2} />
        <View style={styles.dot3} />
      </View>
      <ButtonPrimary text={"Next"} linkName={"Home"} />
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
//   btnOutline: {
//     backgroundColor: theme.colors.textPrimary,
//     height: 60,
//     width:20,
//     borderRadius: 8,
//     bottom:50,
//     left:80,
//     alignItems: 'flex-end',
//     justifyContent: 'flex-end',
//     flexDirection: 'row',
//     paddingHorizontal: 90,
//   },
  btnText: {
    position:'absolute',
    color: theme.colors.textPrimary,
    fontSize:16,
    fontFamily:'dm-sans-medium',
    right:49,
    top:100,
},
btnOutline: {
  height: 48,
  borderRadius: 8,
  top:10,
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  paddingHorizontal: 90,
  fontFamily:'dm-sans-regular'
},
smallmore: {
    position:'absolute',
    color: theme.colors.textPrimary,
    fontSize:16,
    fontFamily:'dm-sans-medium',
    right: 180,
    bottom:90,
},
btnIconArrowLeft: {
  position: 'absolute',
  right: 250,
  bottom:90,
  height:20,
  width:20,
},
btnIconArrow: {
    position: 'absolute',
    top:100,
    right:22,
    height:24,
    width:24,

},
screenIndicator: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 20,
},
dot1: {
  width: 40,
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.colors.textPlaceholder,
  marginHorizontal: 13,
  top:20,
},
dot2: {
  width: 40,
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.colors.textPlaceholder,
  marginHorizontal: 13,
  top:20,
},
dot3: {
  width: 40,
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.colors.textPrimary,
  marginHorizontal: 13,
  top:20,
},
activeDot: {
  backgroundColor: theme.colors.textPrimary, // Set the active dot color
},
});