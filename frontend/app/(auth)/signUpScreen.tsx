import { View, Text, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../context/authContext';
import { Link, router } from 'expo-router';
import { authService } from '../context/authService';
import ButtonPrimary from '@/components/buttons/ButtonPrimary';
import TextInputPrimary from '@/components/textinputs/TextInputPrimary';
import { styles } from "@/components/sheets/SheetStyles";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
        router.replace('/signInScreen');
    } else {
        console.log('Email or Password is empty')
    }
  }

  return (
    <GestureHandlerRootView style={styles.backdrop}>
        <Text>SignUpScreen</Text>
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
            helperText="Your password must contain at least 10 characters and at least 1 uppercase letter."
        />
        <TextInputPrimary 
            label="Confirm your password"
            placeholder='Password'
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            // secureTextEntry={true}
        />
        <Text>Your password must contain at least 10 characters and at least 1 uppercase letter.</Text>
        <ButtonPrimary text="Continue" onPress={submit}/>
        <Text>Messages will be shown here</Text>
        <Text><Link href="/signInScreen">Sign in</Link></Text>
    </GestureHandlerRootView>
  )
}