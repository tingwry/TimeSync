import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import TextInputPrimary from "@/components/textinputs/TextInputPrimary";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import { theme } from "../theme";
import { Link, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function CreateProfile() {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const submit = async () => {
    console.log(
      `Create Profile: name = ${name}, username = ${username}, phoneNumber = ${phoneNumber}`
    );
    router.replace("/Terms");
  };

  return (
    <LinearGradient colors={["#182640", "#263D66"]} style={styles.container}>
      <Text style={styles.textHeader}>Create a Profile</Text>
      <View style={styles.authContainer}>
        <TextInputPrimary
          label="Name"
          placeholder="Your name or nickname"
          value={name}
          onChangeText={setName}
        />
        <TextInputPrimary
          label="Username"
          placeholder="@yourusername"
          value={username}
          onChangeText={setUsername}
        />
        <TextInputPrimary
          label="Phone number"
          placeholder="Your phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <Text>
          <Link href="/SignIn">Sign in</Link>
        </Text>
      </View>
      <View style={styles.footer}>
        <ButtonPrimary text="Create Accont" press={submit} />
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
    marginBottom: 48,
  },
  footer: {
    flex: 1,
      justifyContent: "flex-end",
    marginBottom: 44
  },
  authContainer: {
    width: "100%",
    flexDirection: "column",
  },
});
