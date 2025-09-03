import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from '../screens/home';
import {Login} from '../screens/login';
import {RootStackParamList, StackScreens} from './navigation.types';

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={StackScreens.Login}
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name={StackScreens.Login} component={Login} />
                <Stack.Screen name={StackScreens.Home} component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
