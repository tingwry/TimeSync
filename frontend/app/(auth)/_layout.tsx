import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
    return (
        <Stack>
            <Stack.Screen name="signInScreen" options={{ headerShown: false }}/>
            <Stack.Screen name="signUpScreen" options={{ headerShown: false }}/>
            <Stack.Screen name="CreateProfile" options={{ headerShown: false }}/>
            <Stack.Screen name="Terms" options={{ headerShown: false }}/>
            <Stack.Screen name="AllowLocation" options={{ headerShown: false }}/>
            <Stack.Screen name="Questionaires" options={{ headerShown: false }}/>
        </Stack>
    )
}