import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(viewschedules)" options={{ headerShown: true }} />
      <Stack.Screen
        name="(newschedule)"
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
          animationDuration: 250,
        }}
      />
      
    </Stack>
  );
}
