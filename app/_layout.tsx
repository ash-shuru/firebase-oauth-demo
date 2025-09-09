import {expoSecureStorage} from '@/lib/expoSecureStorage';
import {getSecureItem, setSecureItem, StorageKeys} from '@/lib/storage';
import {DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack, useRouter} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {useEffect, useState} from 'react';
import {Linking} from 'react-native';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import 'react-native-reanimated';
import { AUTHZERO_CLIENT_ID, AUTHZERO_DOMAIN, SCHEME } from '@/constants';
import { Auth0Provider } from 'react-native-auth0';

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });
    const [loggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const subscription = Linking.addEventListener("url", ({ url }) => {
            console.log("Redirect received:", url);
            if (url.startsWith(`${SCHEME}://auth`)) {
                setSecureItem(expoSecureStorage, StorageKeys.LOGIN, "Done");
                console.log('Login status saved to secure storage');
                router.replace("/home");
            }
        });
        return () => subscription.remove();
    }, [router]);

    useEffect(() => {
        const checkForToken = async () => {
            const token = await getSecureItem(expoSecureStorage, StorageKeys.LOGIN);
            console.log(`token on loaded state ${loaded}:`, token);
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
            <Auth0Provider domain={AUTHZERO_DOMAIN!} clientId={AUTHZERO_CLIENT_ID!}>
                <KeyboardProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen
                            redirect={loggedIn} // Tempoary approach. We can navigate from the useEffect itself. We'll show a loader in the mean time.
                            name='index'
                        />
                        <Stack.Screen name='home' />
                    </Stack>
                    <StatusBar style='light' />
                </KeyboardProvider>
            </Auth0Provider>
        </ThemeProvider>
    );
}
