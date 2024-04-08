import React from "react";
import { Redirect, Link } from "expo-router";
import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import ButtonPrimaryLink from "@/components/buttons/ButtonPrimaryLink";
import { theme } from "../theme";

export default function StartScreen() {
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
            <Image
                source={require("@/assets/images/logo-inapp.png")}
                style={{ width: 196, height: 196 }}
            />
            <Text style={styles.textWelcome}>Welcome to</Text>
            <Text style={styles.text_logo}>TimeSync</Text>
            <Text style={styles.text_slogan}>Your time management assistant</Text>

            <ButtonPrimaryLink text={"Get Started"} linkName={"/SignIn"} />
        </LinearGradient>   
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    text_logo: {
        fontFamily: "dm-sans-extrabold",
        color: theme.colors.textPrimary,
        fontSize: 52,
    },
    textWelcome: {
        fontFamily: "dm-sans-semibold",
        color: theme.colors.textPrimary,
        fontSize: 24,
        paddingTop: 50,
    },
    text_slogan: {
        fontFamily: "dm-sans-medium",
        color: theme.colors.textCaption,
        fontSize: 16,
    },
});
