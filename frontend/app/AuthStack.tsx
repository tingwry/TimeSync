import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function AuthStack() {
  return (
    <Stack>
        <Stack.Screen name="(auth)" />
    </Stack>
  )
}