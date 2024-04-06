import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import TextInputPrimary from '@/components/textinputs/TextInputPrimary'
import ButtonPrimary from '@/components/buttons/ButtonPrimary';
import { theme } from '../theme';
import { Link, router } from 'expo-router';
import { authService } from '../context/authService';

export default function CreateProfile() {
    const [loading, isLoading] = useState(false);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const [errors, setErrors] = useState({
        username: '',
        name: '',
        phoneNumber: '',
      });

    const validateForm = () => {
        let e = {
            username: '',
            name: '',
            phoneNumber: '',
        };
        if (username === '') {
            e.username = 'Username is required';
        }
        if (name === '') {
            e.name = 'Name is required';
        } 
        if (phoneNumber === '') {
            e.phoneNumber = 'Phone number is required';
        }
    
        setErrors(e);
        return Object.values(e).every(x => x === '')
      }
    
    const submit = async () => {
        if (validateForm()) {
            isLoading(true);
            const res = await authService.register(
                email, password, username, name, phoneNumber
            );
        } 
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.textHeader}>Create a Profile</Text>
                <TextInputPrimary 
                    label="Name"
                    placeholder='Your name or nickname'
                    value={name}
                    onChangeText={setName}
                />
                <TextInputPrimary 
                    label="Username"
                    placeholder='@yourusername'
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInputPrimary 
                    label="Phone number"
                    placeholder='Your phone number'
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
                <Text><Link href="/SignIn">Sign in</Link></Text>
            </View>
            <View style={styles.button}>
                <ButtonPrimary text="Create Accont" press={submit}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: theme.colors.bluePrimary,
        height: '100%',
        width: '100%',
    },
    content: {
        alignItems: 'center',
        width: '100%',
        flex: 9,
    },
    textHeader: {
        color: theme.colors.textPrimary,
        fontFamily: "dm-sans-bold",
        fontSize: 32,
        marginTop: 70,
        marginBottom: 48, 
    },
    button: {
        justifyContent: 'flex-end',
        flex: 1,
    }
})
