import { router } from "expo-router";
// import { jwtDecode } from "jwt-decode";

export type AuthData = {
    access: string;
    refresh: string;
    uid: number;
    username: string;
    name: string;
};



const checkEmail = async (email: string) => {
    // const response = await fetch('http://127.0.0.1:8000/app/auth/check-email/', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email }),
    // });
    

    // if (response.ok) {
    //     const data = await response.json()
    //     console.log(data)
    //     // router.push({ 
    //     //     pathname: '/CreateProfile',
    //     //     params: { email, password }
    //     // });
    //     return data;
    // } else {
    //     const errorData = await response.json();
    //     console.log(errorData)
    //     const errorMessage = errorData.email ? errorData.email[0] : "Unknown error occurred" 
    //     console.log(errorMessage)
    //     return {email: errorMessage};
    // }
}

const register = async (email: string, password: string, username: string, name: string, phoneNumber: string) => {
    // const response = await fetch('http://127.0.0.1:8000/app/auth/register/', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ 
    //         'userauth' : { 
    //             "email": email, 
    //             "password": password 
    //         },
    //         'userinfo' : { 
    //             "username": username, 
    //             "name": name, 
    //             "phone_number": phoneNumber 
    //         }
    //     }),
    // });

    // if (response.ok) {
    //     const data = await response.json();
    //     console.log(data)
    //     router.replace({ 
    //         pathname: '/SignIn',
    //     });
    //     return data;
    // } else {
    //     const errorData = await response.json();
    //     console.log(errorData)

    //     return errorData;
    //     // {"userinfo": {"username": ["user info with this username already exists."]}}
    // }
}

const signIn = async (email: string, password: string): Promise<AuthData> => {
    const baseUrl = process.env.BASE_URL;
    const response = await fetch(`${baseUrl}/auth/token/`, {
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
        const errorData = await response.json();
        console.log(errorData)
        throw new Error("Invalid username or password");
    }
}

const refreshToken = async (refresh: string): Promise<AuthData> => {
    const baseUrl = process.env.BASE_URL;
    const response = await fetch(`${baseUrl}/auth/token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh }),
    });

    if (response.ok) {
        const data = await response.json();
        // console.log(data)
        // const user = jwtDecode(data.access)
        // console.log(user)
        return data;
    } else {
        const errorData = await response.json();
        console.log(errorData)
        throw new Error(errorData);
    }
}

const signOut = async (access?: string, refresh? : string) => {
    if (refresh) {
        const baseUrl = process.env.BASE_URL;
        // const response = await fetch(`${baseUrl}/auth/sign-out/`, {
        const response = await fetch(`${baseUrl}/auth/token/blacklist/`, {   
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access
            },
            body: JSON.stringify({ refresh }),
        });

        if (response.ok) {
            return;
        } else {
            const errorData = await response.json();
            console.error(errorData)
            return;
        } 
    } else {
        return;
    }
    
}

const resetPassword = async ( password: string ) => {
    // const response = await fetch(`${process.env.BASE_URL}/auth/reset-password/`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ password }),
    // });

    // if (response.ok) {
    //     const data = await response.json();
    //     console.log(data)
    //     return data;
    // } else {
    //     throw new Error("Invalid username or password");
    // }
}

const deleteAccount = async ( password: string ) => {
    // const response = await fetch(`${process.env.BASE_URL}/auth/delete-account/`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ password }),
    // });

    // if (response.ok) {
    //     const data = await response.json();
    //     console.log(data)
    //     return data;
    // } else {
    //     throw new Error("Invalid username or password");
    // }
}

// const checkRefresh = async (access: string) => {
//     const response = await fetch('http://
// }

export const authService = {
    signIn, checkEmail, register, refreshToken, signOut, resetPassword, deleteAccount
};