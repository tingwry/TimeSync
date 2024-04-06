import { router } from "expo-router";

export type AuthData = {
    access: string;
    refresh: string;
    uid: number;
};

const signIn = async (email: string, password: string): Promise<AuthData> => {
    const response = await fetch('http://127.0.0.1:8000/app/auth/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data)
        return data;
    } else {
        throw new Error("Invalid username or password");
    }
    // if (email === 'User' && password === 'Password') {
    //     console.log(`service: email = ${email}, password = ${password}`);
    //     return { access: 'access', refresh: 'refresh', uid: 1};
    // } else {
    //     console.log(`Invalid username or password`);
    //     throw new Error("Invalid username or password");
    // }
}

const checkEmail = async (email: string ): Promise<AuthData> => {
    const response = await fetch('http://127.0.0.1:8000/app/auth/check-email/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    if (response.ok) {
        const data = await response.json()
        console.log(data)
        // router.replkace('/CreateProfile');
        return data;
    } else {
        const errorData = await response.json();
        const errorMessage = errorData.email ? errorData.email[0] : "Unknown error occurred" 
        console.log(errorMessage)
        return errorMessage;
    }
}

const register = async (email: string, password: string, username: string, name: string, phone_number: string): Promise<AuthData> => {
    const response = await fetch('http://127.0.0.1:8000/app/auth/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            'userauth' : { email, password },
            'userinfo' : { username, name, phone_number }
        }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data)
        return data;
    } else {
        throw new Error("Invalid username or password");
    }
}

export const authService = {
    signIn, checkEmail, register
};