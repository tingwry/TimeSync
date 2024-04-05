import { Redirect, Link } from "expo-router";
import { StyleSheet, Text, View, Image, StatusBar, Button, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { theme } from "../theme";
import ButtonPrimary from "@/components/buttons/ButtonPrimaryLink";
import React from "react";
import { router } from "expo-router";

export default function Onboard2() {
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
      <TouchableOpacity onPress={() => router.push("/onboarding/Onboarding1")} style={styles.btnOutline}>
          <Image source={require('@/assets/icons/chevron-left.png')} style={styles.btnIconArrowLeft} />
          <Text style={styles.previous}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/onboarding/Onboarding3")} style={styles.btnSkip}>
          <Text style={styles.skip}>Skip</Text>
          <Image source={require('@/assets/icons/chevron-right.png')} style={styles.btnIconArrowRight} />
        </TouchableOpacity>
        <View style={{width: 342, height: 355, bottom:48}}>
      <Image
        source={require("@/assets/images/onboard-pic-2.png")}
        style={{width: 342, height: 390, bottom:65, paddingBottom:60}}
      />
      </View>
      <Text style={styles.text_wakeup}>Arrive at your destination on time</Text>
      <Text style={styles.text_slogan}>Know how much time you have to prepare {"\n"}yourself
       with our personalized timer, and{"\n"} leave your home at the right time.
       </Text>
       <View style={{ height: 3, backgroundColor: theme.colors.textPrimary}} />
       <View style={styles.screenIndicator}>
        <View style={styles.dot1} />
        <View style={styles.dot2} />
        <View style={styles.dot3} />
      </View>
      <ButtonPrimary text={"Next"} linkName={"onboarding/Onboarding3"} />
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
    bottom:60,
    fontFamily: "dm-sans-extrabold",
    color: theme.colors.textPrimary,
    textAlign:'center',
    fontSize: 32,
  },
  text_slogan: {
    fontFamily: "dm-sans-medium",
    color: theme.colors.textCaption,
    fontSize: 16,
    bottom:30,
    // paddingBottom: 15,
    textAlign:'center',
    lineHeight: 28,
  },
  btnIconArrowRight: {
    position: 'absolute',
    left: 245,
    bottom:90,
    height:20,
    width:20,
  },
  skip: {
    position:'absolute',
      color: theme.colors.textPrimary,
      fontSize:16,
      fontFamily:'dm-sans-medium',
      left: 212,
      bottom:90,
  },
  btnText: {
    position:'absolute',
    color: theme.colors.textPrimary,
    fontSize:16,
    fontFamily:'dm-sans-medium',
    right:49,
    top:100,
},
btnIconArrow: {
    position: 'absolute',
    top:100,
    right:22,
    height:24,
    width:24,

},
btnPrev: {
  height: 48,
  position: 'absolute',
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  paddingHorizontal: 90,
  fontFamily:'dm-sans-regular',
  left:10,
},
btnSkip: {
  height: 48,
  right:5,
  bottom:15,
  borderRadius: 8,
  justifyContent: 'flex-start',
  position: 'relative',
  flexDirection: 'row',
  paddingHorizontal: 80,
  fontFamily:'dm-sans-medium'
},
previous: {
  position:'absolute',
  color: theme.colors.textPrimary,
  fontSize:16,
  fontFamily:'dm-sans-medium',
  right: 178,
  bottom:40,
  
},
btnIconArrowLeft: {
  position: 'absolute',
  right: 245,
  bottom:40,
  height:20,
  width:20,

},
btnOutline: {
  height: 48,
  left:9,
  bottom:15,
  borderRadius: 8,
  justifyContent: 'flex-start',
  position: 'relative',
  flexDirection: 'row',
  paddingHorizontal: 80,
  fontFamily:'dm-sans-medium'
},
screenIndicator: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  bottom:15,
  
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
  backgroundColor: theme.colors.textPrimary,
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