import {useCallback, useState} from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import {Colors} from '@/constants/Colors';
import * as AuthSession from 'expo-auth-session';

export default function Login() {
    const AUTHZERO_DOMAIN = process.env.EXPO_PUBLIC_AUTHZERO_DOMAIN;
    const SCHEME = process.env.EXPO_PUBLIC_SCHEME;
    const ANDROID_PACKAGE = process.env.EXPO_PUBLIC_ANDROID_PACKAGE;
    const IOS_BUNDLE = process.env.EXPO_PUBLIC_IOS_BUNDLE;
    const AUTHZERO_CLIENT_ID = process.env.EXPO_PUBLIC_AUTHZERO_CLIENT_ID;
    const DUI_CONNECTION_NAME = process.env.EXPO_PUBLIC_DUI_CONNECTION_NAME;

    const [loading, setLoading] = useState(false);

    const signinViaOAuth2 = useCallback(async () => {
        // 0) Ensuring env vars are set
        if (
            !AUTHZERO_DOMAIN ||
            !SCHEME ||
            !ANDROID_PACKAGE ||
            !IOS_BUNDLE ||
            !AUTHZERO_CLIENT_ID ||
            !DUI_CONNECTION_NAME
        ) {
            console.error('Missing one or more required environment variables.');
            return;
        }

        setLoading(true);

        try {
            // 1) Discovery
            const discovery = {
                authorizationEndpoint: `https://${AUTHZERO_DOMAIN}/authorize`,
                tokenEndpoint: `https://${AUTHZERO_DOMAIN}/oauth/token`,
            };

            // 2) Platform redirecttion
            const redirectUri = AuthSession.makeRedirectUri({path: 'auth'});

            // 3) Building a new request (PKCE on by default for responseType 'code')
            const request = new AuthSession.AuthRequest({
                clientId: AUTHZERO_CLIENT_ID,
                // clientSecret: '' // TODO: Do we need this, too?
                redirectUri,
                responseType: 'code',
                scopes: ['openid', 'profile', 'email', 'offline_access'],
                extraParams: { connection: DUI_CONNECTION_NAME },
                // usePKCE: true, // optional - defaults to true for 'code'
            });

            await request.getAuthRequestConfigAsync();

            // 4) Opening browser for Universal Login
            const result = await request.promptAsync(discovery);

            if (result.type !== 'success' || !result.params.code) {
                console.log('Auth0 login cancelled/failed:', result);
                setLoading(false);
                return;
            }

            // 5) Exchanging code for tokens (no client secret)
            const tokenResponse = await AuthSession.exchangeCodeAsync(
                {
                    clientId: AUTHZERO_CLIENT_ID,
                    code: result.params.code,
                    redirectUri,
                    extraParams: { code_verifier: request.codeVerifier! },
                },
                discovery
            );

            // tokenResponse.accessToken, tokenResponse.idToken, tokenResponse.refreshToken?
            console.log('Auth0 tokens:', tokenResponse);
        } catch (error) {
            console.error('Error during Auth0 OAuth2 flow:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity disabled={loading} onPress={signinViaOAuth2} style={styles.signIn}>
                <Text style={styles.signInText}>OAuth2 Sign-In</Text>
            </TouchableOpacity>
            {loading && (
                <ActivityIndicator
                    size="large"
                    color={Colors.light.tint}
                    style={styles.loadingIndicator}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    loadingIndicator: {
        position: 'absolute',
        bottom: '40%',
        alignSelf: 'center',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.dark.background,
        flex: 1,
        padding: 40,
    },
    inputWrapper: {
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    textInput: {
        color: Colors.light.text,
        flexGrow: 1,
    },
    inputsContainer: {
        gap: 16,
        paddingHorizontal: 32,
        width: '100%',
    },
    passwordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signIn: {
        backgroundColor: '#2112c9',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 24,
    },
    signInText: {
        color: '#fff',
        fontWeight: '700',
    },
});
