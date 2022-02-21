import React,{useMemo , createContext, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from './components/context';

import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HelloWorldScreen from './HelloWorldScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import QRScanScreen from './QRScanScreen';
import RootStackScreen from './RootStackScreen';

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
    const Drawer = createDrawerNavigator();
    const AuthContext = createContext();
    const [loginState , setLoginState] = useState({
      userToken: null,
      id: '1234',
      pw: '0000'
    });
    const authContext = useMemo(() => ({
      signIn: async(foundUser) => {
        // setUserToken('fgkj');
        // setIsLoading(false);
        // const userToken = String(foundUser[0].userToken);
        const userName = foundUser[0].username;
        
        try {
          // await AsyncStorage.setItem('userToken', userToken);
        } catch(e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        // dispatch({ type: 'LOGIN', id: userName, token: userToken });
      },
      signOut: async() => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken');
        } catch(e) {
          console.log(e);
        }
        // dispatch({ type: 'LOGOUT' });
      },
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
      },
      toggleTheme: () => {
        setIsDarkTheme( isDarkTheme => !isDarkTheme );
      }
    }), []);

    return (
       <AuthContext.Provider value={loginState}>
        <NavigationContainer>      
            { loginState.userToken === null ? (            
              <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeScreen}></Drawer.Screen>
                {/* <Drawer.Screen name="Login" component={LoginScreen}></Drawer.Screen> */}
                <Drawer.Screen name="HelloWorld" component={HelloWorldScreen}></Drawer.Screen>
                <Drawer.Screen 
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
                ></Drawer.Screen>
              </Drawer.Navigator>) :            
            <RootStackScreen></RootStackScreen> 
          }
        </NavigationContainer>
       </AuthContext.Provider>
      
    );
  };

  export default App;