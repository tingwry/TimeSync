export type AuthData = {
    token: string;
    uid: number;
};

const signIn = async (email: string, password: string): Promise<AuthData> => {
    // const response = await fetch('http://127.0.0.1:8000/app/auth/token/', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, password }),
    // });

    // if (response.ok) {
    //     const data = await response.json();
    //     console.log(data)
    //     return data;
    // } else {
    //     throw new Error("Invalid username or password");
    // }
    if (email === 'User' && password === 'Password') {
        console.log(`service: email = ${email}, password = ${password}`);
        return { token: 'token', uid: 1};
    } else {
        console.log(`Invalid username or password`);
        throw new Error("Invalid username or password");
    }
}

const signUp = async (email: string, password: string): Promise<AuthData> => {
    const response = await fetch('http://127.0.0.1:8000/app/auth/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error("Invalid username or password");
    }
}

export const authService = {
    signIn, signUp,
};