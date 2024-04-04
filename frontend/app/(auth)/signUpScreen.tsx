import { View, Text, TextInput, Button, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../context/authContext';
import { Link, router } from 'expo-router';
import { authService } from '../context/authService';
import ButtonPrimary from '@/components/buttons/ButtonPrimary';
import TextInputPrimary from '@/components/textinputs/TextInputPrimary';
import { theme } from '../theme';
import ButtonGoogle from '@/components/buttons/ButtonGoogle';

export default function SignUpScreen() {
  const [loading, isLoading] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const auth = useAuth();

  const submit = async () => {
    if (email !== '' || password !== '') {
        console.log(`Sign Up Screen: email = ${email}, password = ${password}`)
        isLoading(true);
        await authService.signUp(email, password);
        router.replace('/CreateProfile');
    } else {
        console.log('Email or Password is empty')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.textHeader}>Sign up</Text>
        <TextInputPrimary 
            label="Email"
            placeholder='example@email.com'
            value={email}
            onChangeText={setEmail}
        />
        <TextInputPrimary 
            label="Create a Password"
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
            // secureTextEntry={true}
            // helperText="Your password must contain at least 10 characters and at least 1 uppercase letter."
        />
        <TextInputPrimary 
            label="Confirm your password"
            placeholder='Password'
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            // secureTextEntry={true}
            helperText="Your password must contain at least 10 characters and at least 1 uppercase letter."
        />
        <ButtonPrimary text="Continue" onPress={submit}/>
        <Text style={styles.signInLink}><Link href="/signInScreen">Sign in with existing account</Link></Text>
        <Text style={styles.or}>Or</Text>
        <ButtonGoogle onPress={() => {console.log('google pressed')}}/>
        <Text style={styles.signInLink}><Link href="/CreateProfile">Create a profile</Link></Text>
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
    
    textHeader: {
        color: theme.colors.textPrimary,
        fontFamily: "dm-sans-bold",
        fontSize: 32,
        marginTop: 70,
        marginBottom: 48,
    },
    signInLink: {
        color: theme.colors.textPrimary,
        fontFamily: "dm-sans-semibold",
        fontSize: 16,
        marginTop: 16,
        marginBottom: 16,
    },
    or: {
        color: theme.colors.textPrimary,
        fontFamily: "dm-sans-bold",
        fontSize: 20,
        marginTop: 4,
        marginBottom: 20,
    },
})