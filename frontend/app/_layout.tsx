import { Stack } from "expo-router"
import { AuthProvider, useAuth } from "./context/authContext"
import Router from "./Router";
// import Router from "./Router";

export default function StackLayout() {
    const authData = undefined;
    return (
        // <Stack>
        //     <Stack.Screen name="(tabs)" />
        // </Stack>
        // <AuthProvider>
        //     <Stack>
        //         <Stack.Screen name="(tabs)" />
        //         <Stack.Screen name="index" />
        //     </Stack>
        // </AuthProvider>
        <AuthProvider>
            <Router />
        </AuthProvider>
        // <AuthProvider>
        //     { authData ? 
        //         <Stack>
        //             <Stack.Screen name="(tabs)" />
        //         </Stack>
        //         : 
        //         <Stack>
        //             <Stack.Screen name="(auth)" />
        //         </Stack>
        //         }
        // </AuthProvider>
    )
}