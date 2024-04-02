import { View, Text, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../context/authContext';
import { styles } from './styles';
import { Link, router } from 'expo-router';
import { authService } from '../context/authService';

export default function SignUpScreen() {
  const [loading, isLoading] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
    <View>
            <Text>SignUpScreen</Text>
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
                    onPress={submit}  
                    color='white'
                />
            </View>
            <Text>Messages will be shown here</Text>
            <Text><Link href="/signInScreen">Sign in</Link></Text>
        </View>
  )
}