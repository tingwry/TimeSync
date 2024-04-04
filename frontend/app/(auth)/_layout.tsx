import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack>
        <Stack.Screen name="signInScreen" options={{ headerShown: false}}/>
        <Stack.Screen name="signUpScreen" />
        <Stack.Screen name="(q)/SetTime" />
        <Stack.Screen name="Questionaires" />
    </Stack>
  )
}