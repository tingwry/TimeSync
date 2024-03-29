import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function AppStack() {
  return (
    <>
    <Stack>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="index" />
    </Stack>
    </>
    
  )
}