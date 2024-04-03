import { Slot } from "expo-router"
import { AuthProvider } from "./context/authContext"

export default function StackLayout() {
    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
        // <Stack>
        //     <Stack.Screen name="index" options={{ headerShown: false }} />
        //     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        //     <Stack.Screen
        //     name="(newschedule)"
        //     options={{
        //         headerShown: false,
        //         animation: "slide_from_bottom",
        //         animationDuration: 250,
        //     }}
        //     />
        // </Stack>
    )
}
