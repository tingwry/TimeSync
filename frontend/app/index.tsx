import React, { useCallback, useEffect } from "react";
import { Redirect, SplashScreen } from "expo-router";
import { useAuth } from "./context/authContext";
import { useFonts } from "expo-font";

export default function StartPage() {
    const [fontsLoaded, fontError] = useFonts({
        "dm-sans-regular": require("@/assets/fonts/DMSans-Regular.ttf"),
        "dm-sans-medium": require("@/assets/fonts/DMSans-Medium.ttf"),
        "dm-sans-semibold": require("@/assets/fonts/DMSans-SemiBold.ttf"),
        "dm-sans-bold": require("@/assets/fonts/DMSans-Bold.ttf"),
      "dm-sans-extrabold": require("@/assets/fonts/DMSans-ExtraBold.ttf"),
    });

    const auth = useAuth();
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }
    
    if (!auth.authData) {
        return <Redirect href="/StartScreen" />;
    }
    return <Redirect href="/Home" />;
};
