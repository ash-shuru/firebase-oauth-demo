import { BaseScreen } from "@/components/ui/BaseScreen";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

import { expoSecureStorage } from "@/lib/expoSecureStorage";
import { getSecureItem, StorageKeys } from "@/lib/storage";

export default function Home() {
    const route = useLocalSearchParams();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        async function fetchToken() {
            const idToken = await getSecureItem(expoSecureStorage, StorageKeys.ID_TOKEN);
            console.log('Loaded ID token from secure storage', idToken);
            setToken(idToken ?? null);
        }
        fetchToken();
    }, []);

    return (
        <BaseScreen>
            <View style={styles.container}>
                <Text>{token ? "Hello" : "Logged in successfully!"}</Text>
                {token && (
                    <Text selectable style={{ marginTop: 20, color: "green", fontSize: 12 }}>
                        {token}
                    </Text>
                )}
            </View>
        </BaseScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.light.background,
        flex: 1,
        marginVertical: 20,
        borderRadius: 20,
    },
});
