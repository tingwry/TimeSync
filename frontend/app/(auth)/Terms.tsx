import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { theme } from '../theme'
import { Link, router } from 'expo-router'
import ButtonPrimary from '@/components/buttons/ButtonPrimary'

export default function Terms() {
    const submit = async () => {
        console.log('Terms: submit')
        router.push('/AllowLocation');
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.textHeader}>Terms & Conditions</Text>
                <ScrollView>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Terms & Conditions</Text>
                    <Text>Hihihih</Text>
                    <Text>Hihihih</Text>
                    <Text>Hihihih</Text>
                    <Text>Hihihih</Text>
                    <Text>Hihihih</Text>
                    <Text>Hihihih</Text>
                </ScrollView>
                <Text><Link href="/CreateProfile">Create a Profile</Link></Text>
                <Text><Link href="/AllowLocation">Allow Location</Link></Text>
            </View>
            <View style={styles.button}>
                <ButtonPrimary text="Continue" onPress={submit}/>
            </View>
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
    content: {
        alignItems: 'center',
        width: '100%',
        flex: 9,
    },
    textHeader: {
        color: theme.colors.textPrimary,
        fontFamily: "dm-sans-bold",
        fontSize: 24,
        marginTop: 20,
        marginBottom: 20,
        
    },
    button: {
        justifyContent: 'flex-end',
        flex: 1,
    }
})