import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from './context/authContext';
import AppStack from './AppStack';
import AuthStack from './AuthStack';


export default function Router() {
    const authData = false;
    return (
        <>
        {authData ? ( <AppStack /> ) : ( <AuthStack />)}
        </>
    )
}