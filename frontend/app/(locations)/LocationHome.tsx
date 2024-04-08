import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Text,
    Pressable,
  } from "react-native";
import { theme } from "../theme"
import React, { useRef, useState } from "react";
import { useRouter, useNavigation } from "expo-router";

export default function LocationHome() {
    const navigation = useNavigation();
    const router = useRouter();

    return (
        <View style={styles.background}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                    >
                    <Image
                        source={require("@/assets/icons/chevron-left.png")}
                        style={{ width: 24, height: 24 }}
                    />
                    <Text style={styles.textButton}>Back</Text>
                </TouchableOpacity>
            <Text style={styles.textHeader}>Saved Locations</Text>
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
      header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
      },
      textHeader: {
        fontFamily: "dm-sans-bold",
        fontSize: 20,
        color: theme.colors.textPrimary,
        justifyContent: "center",
      },
      backButton: {
        position: "absolute",
        paddingRight: 8,
        paddingVertical: 8,
        alignItems: "center",
        left: 0,
        flexDirection: "row",
        gap: 4,
      },
      textButton: {
        color: theme.colors.textPrimary,
        fontSize: 16,
        fontFamily: "dm-sans-medium",
      },
      container: {
        // paddingHorizontal: 8,
        flexDirection: "column",
      },
      textTitle: {
        fontFamily: "dm-sans-regular",
        fontSize: 16,
        color: theme.colors.textPrimary,
        marginLeft: 8,
        marginTop: 8,
      },
})