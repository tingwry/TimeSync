import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
    return (
        <Stack>
            <Stack.Screen name="StartScreen" options={{ headerShown: false }}/>
            <Stack.Screen name="SignIn" options={{ headerShown: false }}/>
            <Stack.Screen name="SignUp" options={{ headerShown: false }}/>
            <Stack.Screen name="CreateProfile" options={{ headerShown: false }}/>
            <Stack.Screen name="Terms" options={{ headerShown: false }}/>
            <Stack.Screen name="AllowLocation" options={{ headerShown: false }}/>
            <Stack.Screen name="Questionaires" options={{ headerShown: false }} />
            <Stack.Screen name="SetHomeLocation" options={{ headerShown: false }} />
            <Stack.Screen name="SetPreparationTime" options={{ headerShown: false }} />
            <Stack.Screen name="SetDestinationLocation" options={{ headerShown: false }} />
            <Stack.Screen name="MapHome" options={{ headerShown: false }}/>
        </Stack>
    )
}