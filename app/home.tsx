import { BaseScreen } from "@/components/ui/BaseScreen";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
    const route = useLocalSearchParams();
    return (
        <BaseScreen>
            <View style={styles.container}>
                <Text>Logged in successfully</Text>
                <Text>Token: {route.token}</Text>
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
