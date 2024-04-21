import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { theme } from "../theme";
import { Link, router } from "expo-router";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import { LinearGradient } from "expo-linear-gradient";

export default function AllowLocation() {
  return (
    <LinearGradient colors={["#182640", "#263D66"]} style={styles.container}>
      <View style={styles.contentView}>
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/location-access.png")}
            style={{
              width: 280,
              height: 250,
            }}
          />
        </View>

        <Text style={styles.textHeader}>Allow Access to Location Service</Text>
        <Text style={styles.textCaption}>
          Let us access your locations for more precise calculations and a
          better experiences.
        </Text>
        <Text>
          <Link href="/Terms">Terms</Link>
        </Text>
      </View>

      <View style={styles.footer}>
        <ButtonPrimary
          text="Allow Access to Location Service"
          press={() => {
            router.replace("/SetHomeLocation");
          }}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  textHeader: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-bold",
    fontSize: 32,
    marginTop: 64,
    marginBottom: 32,
    paddingHorizontal: 32,
    textAlign: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 44,
  },
  contentView: {
    flexDirection: "column",
    justifyContent: "center",
  },
  textCaption: {
    color: theme.colors.textCaption,
    fontFamily: "dm-sans-medium",
    fontSize: 16,
    marginTop: 24,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 150,
    marginBottom: 20,
  },
});
