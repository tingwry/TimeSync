import { theme } from '@/app/theme';
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
                placeholderTextColor={theme.colors.textPlaceholder}
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
        marginBottom: 12,
        width: '100%',
    },

    textInputStyle: {
        height: 48,

        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FEFEFE1A',

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: theme.colors.blueSecondary,
        color: theme.colors.textPrimary, 
        fontSize: 16,

        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 16,
        
    },

    label: {
        color: theme.colors.textPrimary,
        fontSize: 16,
        fontFamily: "dm-sans-semibold",
        marginBottom: 8,
        paddingLeft: 8,
    },

    helperText: {
        color: theme.colors.textCaption,
        fontSize: 14,
        // fontFamily: 'dm-sans',
        
        paddingLeft: 8,
        paddingRight: 8,

        marginTop: 8,
        marginBottom: 12,
    }
})