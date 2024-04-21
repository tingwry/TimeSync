import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import { theme } from "../theme";
import { Link, router, useLocalSearchParams } from "expo-router";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/authContext";

export default function Terms() {
  const [loading, isLoading] = useState(false);
  const { email, password, username, name, phoneNumber } = useLocalSearchParams<{ email: string, password: string, username: string, name: string, phoneNumber: string }>();
  const [agee, setAgree] = useState(true);
  const auth = useAuth();
  
  const submit = async () => {
    if (agee) {
        isLoading(true);
        const baseUrl = process.env.BASE_URL;
        const response = await fetch(`${baseUrl}/auth/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                "email": email, 
                "password": password,
                "username": username, 
                "name": name, 
                "phone_number": phoneNumber 
            }),
        });

        isLoading(false);
        if (response.ok) {
          await auth.signIn(email, password);
            router.replace({ 
                pathname: '/AllowLocation',
            });
        } else {
            const errorData = await response.json();
            console.log('Something went wrong')
            console.log(errorData)
          }
      } else {
        console.log('Please agree to the terms and conditions')
      }
    } 

  return (
    <LinearGradient colors={["#182640", "#263D66"]} style={styles.container}>
      <Text style={styles.textHeader}>Terms & Conditions</Text>
      <ScrollView style={styles.contentView}>
        <Text>
          <Link href="/CreateProfile">Create a Profile</Link>
        </Text>
        <Text>Terms & Conditions</Text>
      </ScrollView>

      <View style={styles.footer}>
        <ButtonPrimary text="Create account" press={submit} />
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
