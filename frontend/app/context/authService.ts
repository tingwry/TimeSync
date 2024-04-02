export type AuthData = {
    token: string;
    email: string;
    name: string;
};

const signIn = async (email: string, _password: string): Promise<AuthData> => {
    // const response = await fetch('http://localhost:3000/auth/signin', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, _password }),
    // });

    // if (response.ok) {
    //     const data = await response.json();
    //     return data.authData;
    // } else {
    //     throw new Error("Invalid username or password");
    // }
    if (email === 'User' && _password === 'Password') {
        console.log(`service: email = ${email}, password = ${_password}`);
        return { token: 'token', email: 'user', name: 'User' };
    } else {
        console.log(`Invalid username or password`);
        throw new Error("Invalid username or password");
    }
}

export const authService = {
    signIn,
};