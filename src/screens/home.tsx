import {BaseScreen} from '@/components/ui/BaseScreen';
import {Colors} from '@/constants/Colors';
import {StackScreenProps} from '@react-navigation/stack';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList, StackScreens} from '../navigation/navigation.types';

export type HomeScreenProps = StackScreenProps<RootStackParamList, StackScreens.Home>;


export const Home = ({route}: HomeScreenProps) => {
    const {token} = route?.params || {};
    return (
        <BaseScreen>
            <View style={styles.container}>
                <Text>Logged in successfully</Text>
                <Text>Token: {token}</Text>
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
});
