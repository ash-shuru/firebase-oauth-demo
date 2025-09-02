import {DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import 'react-native-reanimated';

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);
    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    return (
        <ThemeProvider value={DefaultTheme}>
            <KeyboardProvider>
                <Stack screenOptions={{ headerShown: false }} />
                <StatusBar style="dark" />
            </KeyboardProvider>
        </ThemeProvider>
    );
}
