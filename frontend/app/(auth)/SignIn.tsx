import { View, Text, Button, TextInput, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../context/authContext';
import { Link, router } from 'expo-router';
import ButtonPrimary from '@/components/buttons/ButtonPrimary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TextInputPrimary from '@/components/textinputs/TextInputPrimary';
import { theme } from '../theme';
import ButtonGoogle from '@/components/buttons/ButtonGoogle';
import { useFonts } from 'expo-font';

export default function SignInScreen() {
    const [loading, isLoading] = useState(false);
    const auth = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    

    const [errors, setErrors] = useState({
        username: '',
        password: '',
      });

    const [fontsLoaded] = useFonts({
        "dm-sans-medium": require("@/assets/fonts/DMSans-Medium.ttf"),
        "dm-sans-extrabold": require("@/assets/fonts/DMSans-ExtraBold.ttf"),
        "dm-sans-semibold": require("@/assets/fonts/DMSans-SemiBold.ttf"),
        "dm-sans-regular": require("@/assets/fonts/DMSans-Regular.ttf"),
        "dm-sans-bold": require("@/assets/fonts/DMSans-Bold.ttf"),
    });

    const validateForm = () => {
        let e = {
            username: '',
            password: '',
            confirmPassword: '',
        };
        if (email === '') {
            e.username = 'Email is required';;
        }
        if (password === '') {
            e.password = 'Password is required';
        } 
    
        setErrors(e);
        return Object.values(e).every(x => x === '')
      }

    const login = async () => {
        console.log('Sign In Screen: login')
        if (validateForm()) {
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
        <SafeAreaView style={styles.container}>
            {/* <Questionaires /> */}
            <Text style={styles.textHeader}>Sign in</Text>
            
            <TextInputPrimary 
                label="Email"
                placeholder='example@email.com'
                value={email}
                onChangeText={setEmail}
                errorText={errors.username}
            />
            <TextInputPrimary 
                label="Password"
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                errorText={errors.password}
                password
            />
            <Text style={styles.forgetPasswordLink}>Forget password</Text>
            <ButtonPrimary text="Sign in" press={login}/>
            {/* <Text>Incorrect password will be shown here</Text> */}
            <Text style={styles.signUpLink}><Link href="/SignUp">Sign up for new account</Link></Text>
            <Text style={styles.or}>Or</Text>
            <ButtonGoogle onPress={() => {console.log('google pressed')}}/>
            <Text style={styles.signUpLink}><Link href="/CreateProfile">Create a profile</Link></Text>
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
    forgetPasswordLink: {
        color: theme.colors.textPrimary,
        fontFamily: "dm-sans-semibold",
        fontSize: 14,
        marginTop: 4,
        marginBottom: 16,
        textDecorationLine: 'underline',
    },
    signUpLink: {
        color: theme.colors.textPrimary,
        fontFamily: "dm-sans-semibold",
        fontSize: 16,
        marginTop: 16,
        marginBottom: 16,
        textDecorationLine: 'underline',
    },
    or: {
        color: theme.colors.textPrimary,
        fontFamily: "dm-sans-bold",
        fontSize: 20,
        marginTop: 4,
        marginBottom: 20,
    },
})