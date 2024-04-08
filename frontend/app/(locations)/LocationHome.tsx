import { StyleSheet, View, Text } from "react-native"
import { theme } from "../theme"
import React, { useRef, useState } from "react";

export default function LocationHome() {
    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text>LocationHome</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flexGrow: 1,
        backgroundColor: theme.colors.bluePrimary,
        gap: 16,
        paddingTop: 68,
        paddingHorizontal: 24,
      },
})