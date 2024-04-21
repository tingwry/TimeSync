import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { theme } from "../theme";
import { Link, router, useLocalSearchParams } from "expo-router";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import { LinearGradient } from "expo-linear-gradient";

export default function Terms() {
  const { uid } = useLocalSearchParams<{ uid: string }>();
  const submit = async () => {
    console.log("Terms: submit");
    router.push({ 
      params: { uid },
      pathname: '/AllowLocation',
    });
  }
  return (
    <LinearGradient colors={["#182640", "#263D66"]} style={styles.container}>
      <Text style={styles.textHeader}>Terms & Conditions</Text>
      <ScrollView style={styles.contentView}>
        <Text>
          <Link href="/CreateProfile">Create a Profile</Link>
        </Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Terms & Conditions</Text>
        <Text>Hihihih</Text>
        <Text>Hihihih</Text>
        <Text>Hihihih</Text>
        <Text>Hihihih</Text>
        <Text>Hihihih</Text>
        <Text>Hihihih</Text>
      </ScrollView>

      <View style={styles.footer}>
        <ButtonPrimary text="Continue" press={submit} />
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
  },
  textHeader: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-bold",
    fontSize: 32,
    marginTop: 120,
    marginBottom: 32,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 92,
  },
  contentView: {
    width: "100%",
    flexDirection: "column",
  },
});
