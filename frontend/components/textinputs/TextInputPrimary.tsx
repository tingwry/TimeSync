import React from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';


export interface TextInputPrimaryProps extends TextInputProps {
    label? : string;
    helperText? : string;
}

export default function TextInputPrimary({ label, helperText, ...props }: TextInputPrimaryProps) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>
                {label}
            </Text>}
            <TextInput 
                {...props} 
                placeholderTextColor='#FEFEFE40'
                style={styles.textInputStyle}
            />
            {helperText && <Text style={styles.helperText}>
                {helperText}
            </Text>}
        </View>
    
    );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 32,
        paddingRight: 32,
        marginTop: 16,
        marginBottom: 16,
    },

    textInputStyle: {
        height: 48,

        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FEFEFE1A',

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: '#283752',
        color: 'white',

        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 16,
        
    },

    label: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'dm-sans-medium',
        marginBottom: 10,
    },

    helperText: {
        color: '#BFBFBF',
        fontSize: 14,
        // fontFamily: 'dm-sans',
        marginTop: 10,
    }
})