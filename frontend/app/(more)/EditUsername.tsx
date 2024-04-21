import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { theme } from '../theme';
import ButtonPrimary from '@/components/buttons/ButtonPrimary';
import { useAuth } from '../context/authContext';
import { router, useNavigation } from 'expo-router';
import TextInputPrimary from '@/components/textinputs/TextInputPrimary';

export default function EditUsername() {
    const navigation = useNavigation();
    const [loading, isLoading] = useState(false);
    const auth = useAuth();
    const access = auth.authData?.access;

    const username = auth.authData?.username;
    const [newUsername, setNewUsername] = useState<string>('');
    const [errors, setErrors] = useState({
        newUsername: '',
    });

    const validateForm = () => {
        let e = {
            newUsername: '',
        };
        if (newUsername === '') {
            e.newUsername = 'Please enter at least 1 character';
        } else if (newUsername === username) {
            router.dismiss();
        }

        setErrors(e);
        return Object.values(e).every(x => x === '')
    }

    const submit = async () => {
        if (validateForm()) {
            isLoading(true);
            const baseUrl = process.env.BASE_URL;
            const response = await fetch(`${baseUrl}/auth/edit-info/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + access
                },
                body: JSON.stringify({ 
                    'username': newUsername,
                }),
            });

            isLoading(false);
            if (response.ok) {
                alert("Update successfully");
                router.dismiss();
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.username ? errorData.username[0] : "Unknown error occurred" 
                setErrors({
                    newUsername: errorMessage,
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
                <Text style={styles.textHeader}>Username</Text>
            </View>

            <View style={styles.container}>
                <TextInputPrimary 
                    label="Username"
                    placeholder={username}
                    value={newUsername}
                    onChangeText={setNewUsername}
                    errorText={errors.newUsername}
                />
                <ButtonPrimary text="Save" press={submit}/>
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