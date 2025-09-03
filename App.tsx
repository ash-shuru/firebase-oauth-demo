import {expoSecureStorage} from '@/lib/expoSecureStorage';
import {getSecureItem, StorageKeys} from '@/lib/storage';
import {DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {useEffect, useState} from 'react';
import {KeyboardProvider} from 'react-native-keyboard-controller';

import 'react-native-reanimated';
import AppNavigator from './src/navigation/AppNavigator';

SplashScreen.preventAutoHideAsync();
const App = () => {
    const [loaded] = useFonts({
        SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
    });
    const [loggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkForToken = async () => {
            const token = await getSecureItem(expoSecureStorage, StorageKeys.ID_TOKEN);
            console.log('token', token);
            setIsLoggedIn(!!token);
            SplashScreen.hideAsync();
        };
        if (loaded) {
            checkForToken();
        }
    }, [loaded]);
    if (!loaded || loggedIn === null) {
        // Async font loading only occurs in development.
        return null;
    }

    return (
        <ThemeProvider value={DefaultTheme}>
            <KeyboardProvider>
                <AppNavigator />
                <StatusBar style="dark" />
            </KeyboardProvider>
        </ThemeProvider>
    );
};
export default App;
