import { Slot } from "expo-router"
import { AuthProvider } from "./context/authContext"

export default function StackLayout() {
    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
    )
}
