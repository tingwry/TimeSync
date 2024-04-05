import { Redirect, Link } from "expo-router";
import { StyleSheet, Text, View, Image, StatusBar, Button, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { theme } from "../theme";
import ButtonPrimary from "@/components/buttons/ButtonPrimaryLink";
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
      <TouchableOpacity onPress={() => router.push("/onboarding/Onboarding3")} style={styles.btnOutline}>
          <Text style={styles.skip}>Skip</Text>
          <Image source={require('@/assets/icons/chevron-right.png')} style={styles.btnIconArrowRight} />
        </TouchableOpacity>
        <View>
      <Image
        source={require("@/assets/images/onboard-pic-1.png")}
        style={{ width: 342, height: 320, bottom:45}}
      />
      </View>
      <Text style={styles.text_wakeup}>Wake up with personalized alarm</Text>
      <Text style={styles.text_slogan}>Maximize your sleep time
       with our{"\n"}intelligent ML that will calculate the best{"\n"} 
       wake up time for you.</Text>
       <View style={{ height: 3, backgroundColor: theme.colors.textPrimary}} />
       <View style={styles.screenIndicator}>
        <View style={[styles.dot1, styles.activeDot]} />
        <View style={styles.dot2} />
        <View style={styles.dot3} />
      </View>
      <ButtonPrimary text={"Next"} linkName={"onboarding/Onboarding2"} />
    
    
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
skip: {
    position:'absolute',
    color: theme.colors.textPrimary,
    fontSize:16,
    fontFamily:'dm-sans-medium',
    left: 215,
    bottom:90,
},
smallmore: {
  color: theme.colors.textPrimary,
    fontSize:16,
    fontFamily:'dm-sans-regular',
    right:65,
},
btnOutline: {
  height: 48,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'flex-start',
  position: 'relative',
  flexDirection: 'row',
  paddingHorizontal: 90,
  fontFamily:'dm-sans-regular'
},

btnIconArrow: {
    position: 'absolute',
    top:100,
    right:22,
    height:24,
    width:24,

},
btnIconArrowRight: {
  position: 'absolute',
  left: 250,
  bottom:90,
  height:20,
  width:20,
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
  backgroundColor: theme.colors.textPrimary,
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
  backgroundColor: theme.colors.textPlaceholder,
  marginHorizontal: 13,
  top:20,
},
activeDot: {
  backgroundColor: theme.colors.textPrimary, // Set the active dot color
},
});