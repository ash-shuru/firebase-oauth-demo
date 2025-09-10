import { useCallback, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { useAuth0 } from "react-native-auth0";

import { DUI_CONNECTION_NAME, SCHEME } from "@/constants";

export default function Login() {
    const [loading, setLoading] = useState(false);

    const { authorize, user, isLoading, error } = useAuth0();

    // Authorization via react-native-oauth
    const login = useCallback(async () => {
        try {
            setLoading(true);
            const resp = await authorize({
                connection: DUI_CONNECTION_NAME,
                redirectUrl: `${SCHEME}://auth`,
            });
            console.log("RNAUTH0 Response", resp);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log("RNAUTH0 error", error);
        }
    }, []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>SDK is Loading</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Authorize via react-native-auth0 */}
            {!user && (
                <TouchableOpacity disabled={loading} onPress={login} style={styles.signIn}>
                    <Text style={styles.signInText}>Auth0 sign in</Text>
                </TouchableOpacity>
            )}
            {user && <Text>Logged in as {user.name}</Text>}
            {error && <Text>{error.message}</Text>}
            {/* Authorize via react-native-auth0 */}

            {loading && (
                <ActivityIndicator
                    size='large'
                    color={Colors.light.tint}
                    style={styles.loadingIndicator}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    loadingIndicator: {
        position: "absolute",
        bottom: "40%",
        alignSelf: "center",
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
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
        width: "100%",
    },
    passwordWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    signIn: {
        backgroundColor: "#2112c9",
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 24,
    },
    signInText: {
        color: "#fff",
        fontWeight: "700",
    },
});
