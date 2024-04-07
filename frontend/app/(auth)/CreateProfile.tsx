import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import TextInputPrimary from '@/components/textinputs/TextInputPrimary'
import ButtonPrimary from '@/components/buttons/ButtonPrimary';
import { theme } from '../theme';
import { Link, router } from 'expo-router';

export default function CreateProfile() {
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const submit = async () => {
        console.log(`Create Profile: name = ${name}, username = ${username}, phoneNumber = ${phoneNumber}`)
        router.replace('/Terms');
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
