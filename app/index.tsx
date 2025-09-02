import {BaseScreen} from '@/components/ui/BaseScreen';
import {Colors} from '@/constants/Colors';
import {useAuthListener} from '@/hooks/useAuthListener';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {useRouter} from 'expo-router';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

export default function Login() {
    const router = useRouter();
    const [documentNo, setDocumentNo] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { user, federatedSignIn } = useAuthListener();
    const handleSignIn = useCallback(async () => {
        try {
            // 
        } catch (error) {
            // console.log('Error logging in', error);
        }
    }, []);

    const handleFederatedSignIn = async () => {
        try {
            const response = await federatedSignIn();
            console.log('response', response);
            // We can listen to auth changes with the hook we have 'useAuthListener'.
            // The User object we get from the hook also provides the idToken.
        } catch (error) {
            console.log('Error', error);
        }
    };

    const shouldDisableLogin = useMemo(() => !password || !documentNo, [password, documentNo]);

    // Comment this to prevent auto-navigation
    useEffect(() => {
        if (user) {
            router.replace({
                pathname: '/home',
                params: { token: 'user.token' },
            });
        }
    }, [router, user]);

    return (
        <BaseScreen>
            <View style={styles.container}>
                <View style={styles.inputsContainer}>
                    <View style={styles.inputWrapper}>
                        <TextInput editable={false} style={styles.textInput} value="DUI" />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Número de documento"
                            style={styles.textInput}
                            value={documentNo}
                            onChangeText={setDocumentNo}
                            placeholderTextColor={'#8A8A8A'}
                        />
                    </View>
                    <View style={[styles.inputWrapper, styles.passwordWrapper]}>
                        <TextInput
                            placeholder="Contraseña"
                            placeholderTextColor={'#8A8A8A'}
                            style={styles.textInput}
                            value={password}
                            secureTextEntry={!showPassword}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
                            <FontAwesome5
                                name={showPassword ? 'eye' : 'eye-slash'}
                                size={18}
                                color="grey"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    disabled={shouldDisableLogin}
                    onPress={handleSignIn}
                    style={styles.signIn}
                >
                    <Text style={styles.signInText}>Iniciar Sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFederatedSignIn} style={styles.signIn}>
                    <Text style={styles.signInText}>Federated sign in</Text>
                </TouchableOpacity>
            </View>
        </BaseScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.background,
        flex: 1,
        marginVertical: 20,
        borderRadius: 20,
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
