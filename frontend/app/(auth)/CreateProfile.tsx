import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import TextInputPrimary from '@/components/textinputs/TextInputPrimary'
import ButtonPrimary from '@/components/buttons/ButtonPrimary';
import { theme } from '../theme';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function CreateProfile() {
    const [loading, isLoading] = useState(false);

    const { email, password } = useLocalSearchParams<{ email: string, password: string }>();

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
        const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
        if (username === '') {
            e.username = 'Username is required';
        }
        if (name === '') {
            e.name = 'Name is required';
        } 
        if (phoneNumber === '') {
            e.phoneNumber = 'Phone number is required';
        } else if (cleanedPhoneNumber.length !== 10) {
            e.phoneNumber = 'Please enter a valid phone number';
        }
    
        setErrors(e);
        return Object.values(e).every(x => x === '')
    }

    const submit = async () => {
        if (validateForm()) {
            isLoading(true);
            const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

            const baseUrl = process.env.BASE_URL;
            const response = await fetch(`${baseUrl}/auth/check-userinfo/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    "username": username, 
                    "name": name, 
                    "phone_number": cleanedPhoneNumber 
                }),
            });

            isLoading(false);
            if (response.ok) {
                router.replace({ 
                    params: { email, password, username, name, cleanedPhoneNumber },
                    pathname: '/Terms',
                });
            } else {
                const errorData = await response.json();
                if (errorData.userinfo) {
                    let e = {
                        username: '',
                        name: '',
                        phoneNumber: '',
                    };
                    if (errorData.userinfo.username) {
                        e.username = errorData.userinfo.username[0];
                    }
                    if (errorData.userinfo.name) {
                        e.name = errorData.userinfo.name[0];
                    }
                    if (errorData.userinfo.phone_number) {
                        e.phoneNumber = errorData.userinfo.phone_number[0];
                    }
                    setErrors(e);
                } else {
                    console.log('Something went wrong')
                    console.log(errorData)
                }
            }
        }
    }

  return (
    <LinearGradient colors={["#182640", "#263D66"]} style={{paddingHorizontal: 32}}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.textHeader}>Create a Profile</Text>
        <View style={styles.authContainer}>
          <TextInputPrimary
            label="Name"
            placeholder="Your name or nickname"
            value={name}
            onChangeText={setName}
            errorText={errors.name}
          />
          <TextInputPrimary
            label="Username"
            placeholder="@yourusername"
            value={username}
            onChangeText={setUsername}
            errorText={errors.username}
          />
          <TextInputPrimary
            label="Phone number"
            placeholder="Your phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            errorText={errors.phoneNumber}
          />
        </View>
        <View style={styles.footer}>
          <ButtonPrimary text="Continue" press={submit} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    flexGrow: 1,
  },
  textHeader: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-bold",
    fontSize: 32,
    marginTop: 100,
    marginBottom: 40,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  authContainer: {
    width: "100%",
    flexDirection: "column",
  },
});