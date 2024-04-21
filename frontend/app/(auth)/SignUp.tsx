import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { authService } from "../context/authService";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import TextInputPrimary from "@/components/textinputs/TextInputPrimary";
import { theme } from "../theme";
import ButtonGoogle from "@/components/buttons/ButtonGoogle";
import PasswordInput from "@/components/textinputs/PasswordInput";
import { LinearGradient } from "expo-linear-gradient";

export default function SignUpScreen() {
    const [loading, isLoading] = useState(false);
    //   const auth = useAuth();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const validateForm = () => {
        let e = {
            email: '',
            password: '',
            confirmPassword: '',
        };
        if (email === '') {
            e.email = 'Email is required';;
        }
        if (password === '') {
            e.password = 'Password is required';
        } 
        if (confirmPassword === '') {
            e.confirmPassword = 'Confirm Password is required';
        } else if (password !== confirmPassword && password !== '' && confirmPassword !== '') {
            e.confirmPassword = 'Passwords do not match';
        }

        setErrors(e);
        return Object.values(e).every(x => x === '')
    }

    const submit = async () => {
        if (validateForm()) {
            isLoading(true);
            const baseUrl = process.env.BASE_URL;
            const response = await fetch(`${baseUrl}/auth/check-email/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            
            isLoading(false);
            if (response.ok) {
                router.push({ 
                    pathname: '/CreateProfile',
                    params: { email, password }
                });
                return;
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.email ? errorData.email[0] : "Unknown error occurred" 
                setErrors({
                    email: errorMessage,
                    password: '',
                    confirmPassword: '',
                });
            }
        }
    }

  return (
    <LinearGradient colors={["#182640", "#263D66"]} style={styles.container}>
      <Text style={styles.textHeader}>Sign up</Text>
      <View style={styles.authContainer}>
        <TextInputPrimary
          label="Email"
          placeholder="example@email.com"
          value={email}
          onChangeText={setEmail}
          errorText={errors.email}
        />
        <PasswordInput
          label="Create a Password"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          errorText={errors.password}
          password
          // helperText="Your password must contain at least 10 characters and at least 1 uppercase letter."
        />
        <PasswordInput
          label="Confirm your password"
          placeholder="Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          errorText={errors.confirmPassword}
          password
          // helperText="Your password must contain at least 10 characters and at least 1 uppercase letter."
        />
        <View style={{ marginTop: 16 }}>
          <ButtonPrimary text="Continue" press={submit} />
        </View>
      </View>

      <Text style={styles.signInLink}>
        <Link href="/SignIn">Sign in with existing account</Link>
      </Text>
      <Text style={styles.or}>Or</Text>
      <ButtonGoogle
        onPress={() => {
          console.log("google pressed");
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: theme.colors.bluePrimary,
    height: "100%",
    width: "100%",
  },
  textHeader: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-bold",
    fontSize: 32,
    marginTop: 120,
    marginBottom: 48,
  },
  signInLink: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-semibold",
    fontSize: 16,
    marginTop: 16,
    marginBottom: 16,
    textDecorationLine: "underline",
  },
  or: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-bold",
    fontSize: 20,
    marginTop: 4,
    marginBottom: 20,
  },
  authContainer: {
    width: "100%",
    flexDirection: "column",
    paddingHorizontal: 32,
  },
});