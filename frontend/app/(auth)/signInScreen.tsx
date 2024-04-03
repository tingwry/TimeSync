import { View, Text, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles';
import { useAuth } from '../context/authContext';
import { Link, router } from 'expo-router';

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
        <View>
            <Text>SignInScreen</Text>
            <TextInput 
                // label="Email"
                placeholder='example@email.com'
                placeholderTextColor='#FEFEFE40'
                value={email}
                onChangeText={setEmail}
                style={styles.textField}
            />
            <TextInput 
                // label="Password"
                placeholder='Password'
                placeholderTextColor='#FEFEFE40'
                value={password}
                onChangeText={setPassword}
                // secureTextEntry={true}
                style={styles.textField}
            />
            <Text>Forget password</Text>
            <View style={styles.buttonCustom}>
                <Button
                    title='Sign In'
                    onPress={login}  
                    color='white'
                />
            </View>
            <Text>Incorrect password will be shown here</Text>
            <Text><Link href="/signUpScreen">Sign up for new account</Link></Text>
            <Text>Or</Text>
            <Button
                title='Sign in with Google'
                disabled={true}
            />
            
        </View>
    )
}