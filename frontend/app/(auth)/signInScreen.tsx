import { View, Text, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../context/authContext';
import { Link, router } from 'expo-router';
import ButtonPrimary from '@/components/buttons/ButtonPrimary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TextInputPrimary from '@/components/textinputs/TextInputPrimary';
import { styles } from "@/components/sheets/SheetStyles";
import SetTime from './SetTime';
import Questionaires from './Questionaires';

export default function SignInScreen() {
    const [loading, isLoading] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const auth = useAuth();

    const login = async () => {
        console.log('Sign In Screen: login')
        if (email !== '' || password !== '') {
            console.log(`Sign In Screen: email = ${email}, password = ${password}`)
            isLoading(true);
            await auth.signIn(email, password);
            console.log('Sign In Screen: router.replace(/Home)')
            router.replace('/Home');
        } else {
            console.log('Email or Password is empty')
        }
    }

    return (
        <GestureHandlerRootView>
            {/* <SetTime /> */}
            <Questionaires />
            {/* <Text>SignInScreen</Text>
            
            <TextInputPrimary 
                // label="Email"
                placeholder='example@email.com'
                value={email}
                onChangeText={setEmail}
            />
            <TextInputPrimary 
                // label="Password"
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                // secureTextEntry={true}
                autoComplete='off'
            />
            <Text>Forget password</Text>
            <ButtonPrimary text="Sign in" onPress={login}/>
            <Text>Incorrect password will be shown here</Text>
            <Text><Link href="/signUpScreen">Sign up for new account</Link></Text>
            <Text>Or</Text>
            
            <Button
                title='Sign in with Google'
                disabled={true}
            /> */}

            
            
        </GestureHandlerRootView>
    )
}