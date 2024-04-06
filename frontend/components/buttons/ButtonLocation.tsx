import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { theme } from '@/app/theme';

export interface ButtonLocationProps {
    text? : string;
    onPress?: () => void;
}

export default function ButtonLocation( { text, onPress } : ButtonLocationProps ) {
    const t = "";
    return (
        <View style={styles.container}>
            <Pressable style={[styles.buttonStyle, styles.shadowProp]} onPress={onPress}>
                {text ? 
                    <Text style={styles.buttonText}>{text}</Text>
                    : <Text style={styles.buttonText}>Choose Location</Text>
                }
            </Pressable>
        </View>
        
    )
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 32,
        paddingRight: 32,

        marginTop: 16,
        width: "100%",
        
        alignItems: "center",
    },
    buttonStyle: { // Adjusting width considering left and right margin of 32
      height: 48,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "flex-start",
      borderColor: theme.colors.textPrimary,
      borderWidth: 1,
      paddingLeft: 48,
      width: "100%",
    },
    buttonText: {
      fontFamily: "dm-sans-semibold",
      color: theme.colors.textPrimary,
      fontSize: 16,
    },
    shadowProp: {
      shadowColor: theme.colors.textPrimary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
  });