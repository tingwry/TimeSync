import { View, Text } from 'react-native'
import React, { useState } from 'react'
import TextInputPrimary from '@/components/textinputs/TextInputPrimary'
import ButtonPrimary from '@/components/buttons/ButtonPrimary';

export default function CreateProfile() {
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const submit = async () => {
        console.log(`Create Profile: name = ${name}, username = ${username}, phoneNumber = ${phoneNumber}`)
      }

    return (
        <View>
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
                label="Your phone number"
                placeholder='@yourusername'
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <ButtonPrimary text="Create Accont" onPress={submit}/>
        </View>
    )
}