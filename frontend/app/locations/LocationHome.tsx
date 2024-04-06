import { StyleSheet, View } from "react-native"
import { theme } from "../theme"
import React from "react"

export function LocationHome() {
    return (
        <View style={styles.background}>
            
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