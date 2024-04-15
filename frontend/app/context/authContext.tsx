import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthData, authService } from "./authService";
import { Redirect, router } from "expo-router";

type AuthContextData = {
    authData?: AuthData;
    loading: boolean;
    signIn(username: string, _password: string): Promise<void>;
    signOut(): void;
};

// Create the Auth Context with the data type specified
// and a empty object
const AuthContext = createContext<AuthContextData | undefined>({} as AuthContextData);

type AuthProviderProps = {
    children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
// function AuthProvider({ children }): AuthProviderProps {
    const [authData, setAuthData] = useState<AuthData>();

    // the AuthContext start with loading equals true
    // and stay like this, until the data be load from Async Storage
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Every time the App is opened, this provider is rendered
        // and call de loadStorage function.
        loadStorageData();
    }, []);

    async function loadStorageData(): Promise<void> {
        try {
            // Try getting the data from Async Storage
            const authDataSerialized = await AsyncStorage.getItem('@AuthData');
            if (authDataSerialized) {
                // If there are data, it's converted to an Object and the state is updated.
                const _authData: AuthData = JSON.parse(authDataSerialized);
                setAuthData(_authData);
            }
        } catch (error) {
        } finally {
            // loading finished
            setLoading(false);
        }
    }

    const signIn = async (email: string, _password: string) => {
        // call the service passing credential (email and password).
        // In a real App this data will be provided by the user from some InputText components.
        const _authData = await authService.signIn(email, _password);
        // console.log(_authData);
        setAuthData(_authData);
        AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
    };

    const signOut = async () => {
        // Remove data from context, so the App can be notified
        // and send the user to the AuthStack
        // setAuthData(undefined);

        // Remove the data from Async Storage
        // to NOT be recoverede in next session.
        await AsyncStorage.removeItem('@AuthData');
        
        await authService.signOut(authData?.access, authData?.refresh);
        setAuthData(undefined);

        router.dismissAll
        router.replace('/SignIn');
    };

    // const updateToken = async () => {

    useEffect(() => {
        let interval = setInterval(async () => {
            if (authData) {
                try {
                    const _authData = await authService.refreshToken(authData.refresh);
                    setAuthData(_authData);
                    AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
                    console.log('Token refreshed');
                    console.log(_authData);
                } catch (error) {
                    console.error('Error refreshing token:', error);
                    signOut();
                }
            }
        }, 1000 * 60 * 10);
        return () => clearInterval(interval);
    }, [authData]);


    return (
        // This component will be used to encapsulate the whole App,
        // so all components will have access to the Context
        <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
            { loading ? null : children }
        </AuthContext.Provider>
    );
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
  
    return context;
  }

export { AuthContext, AuthProvider, useAuth };