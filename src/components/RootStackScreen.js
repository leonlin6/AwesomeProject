import React, {useState} from 'react';

import LoginScreen from "./LoginScreen";
import LogoutScreen from './LogoutScreen';
import SplashScreen from './SplashScreen';
import FingerprintScreen from './FingerprintScreen';

import { createStackNavigator } from "@react-navigation/stack";


const RootStack = createStackNavigator();


const RootStackScreen = () => {
    return(
        <RootStack.Navigator headerShown={false}>
            {/* <RootStack.Screen name="Splash" component={SplashScreen}></RootStack.Screen> */}
            {/* <RootStack.Screen name="Login" component={LoginScreen}></RootStack.Screen> */}
            {/* <RootStack.Screen name="Logout" component={LogoutScreen}></RootStack.Screen> */}
            <RootStack.Screen name='Fingerprint' component={FingerprintScreen}></RootStack.Screen>

        </RootStack.Navigator>
    );
}

export default RootStackScreen;