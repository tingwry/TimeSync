import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet } from "react-native";

export default function ButtonNewSchedule() {
  return (
    <LinearGradient
      colors={["#FF971C", "#FFBC10"]}
      style={{
        width: 72,
        height: 72,
        borderRadius: 36,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("@/assets/icons/new-schedule-plus.png")}
        style={{width: 48, height: 48}}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  buttonIcon: {},
});
