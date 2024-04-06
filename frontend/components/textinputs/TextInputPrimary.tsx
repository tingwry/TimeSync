import { theme } from '@/app/theme';
import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';


export interface TextInputPrimaryProps extends TextInputProps {
    label? : string;
    helperText? : string;
    errorText? : string;
    password?: boolean;
}

export default function TextInputPrimary({ label, helperText, errorText, password, ...props }: TextInputPrimaryProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(password);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>
                {label}
            </Text>}
            
            <TextInput 
                {...props} 
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect={false}
                secureTextEntry={hidePassword}
                placeholderTextColor={theme.colors.textPlaceholder}
                style={[
                    styles.textInputStyle,
                    { borderColor: 
                        errorText ? theme.colors.red :
                        isFocused ? theme.colors.textPrimary 
                        : '#FEFEFE1A'
                    }
                    
                ]}
                onFocus={() => {setIsFocused(true)}}
                onBlur={() => {setIsFocused(false)}}
            />
            {password && <Pressable onPress={() => setHidePassword(!hidePassword)}><Text>toggle hide</Text></Pressable>}
            {/* {helperText && <Text style={styles.helperText}>
                {helperText}
            </Text>} */}
            {/* <Text style={styles.helperText}>
                {helperText}
            </Text> */}
            {errorText && <Text style={styles.errorText}>
                {errorText}
            </Text>}
        </View>
    
    );
};

// const screenWidth = Dimensions.get("window").width;

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
        marginBottom: 0,
    },
    errorText : {
        color: theme.colors.red,
        fontSize: 14,
        // fontFamily: 'dm-sans',
        
        paddingLeft: 8,
        paddingRight: 8,

        marginTop: 8,
        marginBottom: 0,
    }
})
