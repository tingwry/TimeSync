import { View, Text, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles';
import { useAuth } from '../context/authContext';

export default function SignInScreen() {
    const [loading, isLoading] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const auth = useAuth();

    const submit = async () => {
        if (email !== '' || password !== '') {
            console.log(`Sign In Screen: email = ${email}, password = ${password}`)
            isLoading(true);
            await auth.signIn(email, password);
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
                    onPress={submit}  
                    color='white'
                />
            </View>
            <Text>Incorrect password will be shown here</Text>
            <Text>Sign up for new account</Text>
            <Text>Or</Text>
            <Button
                title='Sign in with Google'
                disabled={true}
            />
            
        </View>
    )
}