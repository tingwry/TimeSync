import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { theme } from "../theme";
import { router, useNavigation } from 'expo-router';
import PasswordInput from '@/components/textinputs/PasswordInput';
import ButtonPrimary from '@/components/buttons/ButtonPrimary';
import { useAuth } from '../context/authContext';

export default function ResetPassword() {
    const navigation = useNavigation();

    const [loading, isLoading] = useState(false);
    const auth = useAuth();
    const access = auth.authData?.access;

    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    
    const [errors, setErrors] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const validateForm = () => {
        let e = {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        };
        if (currentPassword === '') {
            e.currentPassword = 'Current Password is required';
        }
        if (newPassword === '') {
            e.newPassword = 'Password is required';
        } 
        if (confirmNewPassword === '') {
            e.confirmNewPassword = 'Confirm Password is required';
        } else if (newPassword !== confirmNewPassword && newPassword !== '' && confirmNewPassword !== '') {
            e.confirmNewPassword = 'Passwords do not match';
        }

        setErrors(e);
        return Object.values(e).every(x => x === '')
    }

    const submit = async () => {
        if (validateForm()) {
            isLoading(true);
            // const res = await authService.register(
            //     email, password, username, name, phoneNumber
            // );
            const baseUrl = process.env.BASE_URL;
            const response = await fetch(`${baseUrl}/auth/reset-password/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + access
                },
                body: JSON.stringify({ 
                    'current_password' : currentPassword,
                    'new_password' : newPassword
                }),
            });

            isLoading(false);
            if (response.ok) {
                alert("Password reset successfully");
                router.dismiss();
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.current_password ? errorData.current_password[0] : "Unknown error occurred" 
                setErrors({
                    currentPassword: errorMessage,
                    newPassword: '',
                    confirmNewPassword: '',
                });
            }
        }
    }
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
                <Text style={styles.textHeader}>Reset Password</Text>
            </View>

            <View style={styles.container}>
                <PasswordInput
                    label="Current Password"
                    placeholder="Password"
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    errorText={errors.currentPassword}
                    password
                />
                <PasswordInput
                    label="New Password"
                    placeholder="Password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    errorText={errors.newPassword}
                    password
                />
                <PasswordInput
                    label="Confirm New Password"
                    placeholder="Password"
                    value={confirmNewPassword}
                    onChangeText={setConfirmNewPassword}
                    errorText={errors.confirmNewPassword}
                    password
                />
                <ButtonPrimary text="Reset Password" press={submit}/>
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
        marginBottom: 16,
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
        paddingHorizontal: 8,
        flexDirection: "column",
        // backgroundColor: theme.colors.green,
        width: '100%',
    },
    
});
  