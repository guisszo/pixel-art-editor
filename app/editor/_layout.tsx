import { Stack } from 'expo-router';

export default function EditorLayout({ children }: { children: React.ReactNode }) {
    return (
        <Stack
            screenOptions={{ headerShown: false }}
        >
            {children}
        </Stack>
    );
}
