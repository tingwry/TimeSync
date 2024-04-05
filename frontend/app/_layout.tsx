import { Stack } from "expo-router"
import React from "react"

export default function StackLayout() {
    return (
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
            <Stack.Screen name="list" options={{ headerShown: false}}/>
        </Stack>
    )
}