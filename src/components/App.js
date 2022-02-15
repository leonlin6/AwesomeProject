import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HelloWorldScreen from './HelloWorldScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import QRScanScreen from './QRScanScreen';


import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
          {/* <Tab.Navigator
            initialRouteName="Home" 
            screenOptions={
              ({route}) => ({
              tabBarIcon: ({focused, color, size}) =>{
                let iconName = '';
                if(route.name === 'Home'){
                  iconName = focused ? 'home' : 'home-outline';
                }else if(route.name === 'Login'){
                  iconName = focused ? 'ios-enter' : 'ios-enter-outline';
                }else if(route.name === 'HelloWorld'){
                  iconName = focused ? 'ios-file-tray-full' : 'ios-file-tray';
                }else if(route.name === 'QRScan'){
                  iconName = focused ? 'ios-qr-code' : 'ios-qr-code-outline';
                }
                return  <Ionicons name={iconName} size={size} color={color}></Ionicons>;
              },
              tabBarActiveTintColor: '#0f659d',
              tabBarInactiveTintColor: 'gray',
            })}>

              <Tab.Screen name="Login" component={LoginScreen}></Tab.Screen>
              <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>
              <Tab.Screen name="HelloWorld" component={HelloWorldScreen}></Tab.Screen>
              <Tab.Screen name="QRScan" component={QRScanScreen}></Tab.Screen>

          </Tab.Navigator> */}
          <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
              <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
              <Stack.Screen name="HelloWorld" component={HelloWorldScreen}></Stack.Screen>
              <Stack.Screen 
                name="QRScan" 
                component={QRScanScreen}
                options= {({route}) => ({
                  title:route.name,
                  headerStyle: {
                    height:40,
                    backgroundColor: 'lightgreen',
                    shadowOpacity:0.1,
                    shadowColor: '#000',
                    shadowOffset: {width: 0 , height: 3},
                  },
                  headerTintColor: 'red',
                  headerTtitleStyle: {
                    fontWeight: '500',
                    fontSize: 40
                  }
                })
                }                
              ></Stack.Screen>

          </Stack.Navigator>
      </NavigationContainer>
    );
  };

  export default App;