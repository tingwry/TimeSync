import { Stack } from "expo-router";
import React from "react";
import { AuthProvider } from "./context/authContext";

export default function StackLayout() {

    return (
        <AuthProvider>
            
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(viewschedules)" options={{ headerShown: true }} />
                <Stack.Screen
                  name="(newschedule)"
                  options={{
                    headerShown: false,
                    animation: "slide_from_bottom",
                    animationDuration: 250,
                  }}
                />
                <Stack.Screen name="(more)" options={{ headerShown: false }} />
            </Stack>
        </AuthProvider>
      
    );
}
