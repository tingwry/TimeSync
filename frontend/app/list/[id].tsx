import { Stack, useGlobalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function DetailPage() {
    const { id } = useGlobalSearchParams();

    return (
        <View>
            <Stack.Screen options={{ headerTitle: `Details #${id}` }} />
            
            <Text>My Details for: {id}</Text>
        </View>
    )
}