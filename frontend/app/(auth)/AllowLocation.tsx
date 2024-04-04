import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { theme } from '../theme'
import { Link } from 'expo-router'
import ButtonPrimary from '@/components/buttons/ButtonPrimary'

export default function AllowLocation() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.textHeader}>Allow Access to Location Service</Text>
                <Text style={styles.textCaption}>Let us access your locations for more precise calculations and a better experiences.</Text>
                <Text><Link href="/Terms">Terms</Link></Text>
                <Text><Link href="/Questionaires">Questionaires</Link></Text>
            </View>
            
            <View style={styles.button}>
                <ButtonPrimary text="Allow Access to Location Service" onPress={() => {}}/>
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
        fontSize: 32,
        marginTop: 20,
        marginBottom: 20,
        width: '80%',
        textAlign: 'center',
    },
    textCaption: {
        color: theme.colors.textCaption,
        fontFamily: "dm-sans-medium",
        fontSize: 16,
        marginTop: 24,
        width: '80%',
        textAlign: 'center',
    },
    button: {
        justifyContent: 'flex-end',
        flex: 1,
    }
})