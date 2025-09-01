import {useColorScheme} from '@/hooks/useColorScheme';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import 'react-native-reanimated';

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <KeyboardProvider>
                <Stack initialRouteName="login">
                    <Stack.Screen name="login" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" redirect options={{ headerShown: false }} />
                </Stack>
                <StatusBar style="auto" />
            </KeyboardProvider>
        </ThemeProvider>
    );
}
