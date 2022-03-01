import React,{useMemo , createContext, useState, useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AuthContext } from './components/context';
import {connect} from 'react-redux';

import { NavigationContainer, TabActions, useFocusEffect } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HelloWorldScreen from './HelloWorldScreen';
import HomeScreen from './HomeScreen';
import QRScanScreen from './QRScanScreen';
import RootStackScreen from './RootStackScreen';
import Logout from './Logout';


const App = (props) => {
    // const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    const Drawer = createDrawerNavigator();
    // const AuthContext = createContext();

    // const [loginState , setLoginState] = useState({
    //   userToken: null,
    //   id: '1234',
    //   pw: '0000'
    // });

    const [showAuthDraw, setShowAuthDraw] = useState(false);
    
    useEffect(  () => {
        try{
          if(props.loginToken !== null){
            if(props.loginToken.userAuth.level === 'administrator'){

              setShowAuthDraw(true);
              console.log('admin true');

            }else{
              console.log('admin false');
  
              setShowAuthDraw(false);
            }
          }
          // else{
          //   const storageInfo =  AsyncStorage.getItem('@userToken');
          //   if(storageInfo === null){
          //     setShowAuthDraw(false);
          //     console.log('there is no login data');
          //   }
            
          // }

        }catch(error){

          console.log('error', error);
        }
      }, 
      [props.loginToken]
    );

    // const authContext = useMemo(() => ({
    //   signIn: async(foundUser) => {
    //     setUserToken('fgkj');
    //     setIsLoading(false);
    //     const userToken = String(foundUser[0].userToken);
    //     const userName = foundUser[0].username;
        
    //     try {
    //       await AsyncStorage.setItem('userToken', userToken);
    //     } catch(e) {
    //       console.log(e);
    //     }
    //     console.log('user token: ', userToken);
    //     dispatch({ type: 'LOGIN', id: userName, token: userToken });
    //   },
    //   signOut: async() => {
    //     setUserToken(null);
    //     setIsLoading(false);
    //     try {
    //       await AsyncStorage.removeItem('userToken');
    //     } catch(e) {
    //       console.log(e);
    //     }
    //     dispatch({ type: 'LOGOUT' });
    //   },
    //   signUp: () => {
    //     setUserToken('fgkj');
    //     setIsLoading(false);
    //   },
    //   toggleTheme: () => {
    //     setIsDarkTheme( isDarkTheme => !isDarkTheme );
    //   }
    // }), []);

    const QRScanStackScreen = () => {
      return(
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
            },
            drawerIcon: ({focused, size}) => {return <Ionicons name='scan-sharp' size={25}></Ionicons>}
          })}                
        ></Stack.Screen> 
      )
    }

    const DrawerContainer = () => {
      return(
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name='Home' component={HomeScreen} options={{drawerIcon: ({focused, size}) => {return <Ionicons name='home' size={25}></Ionicons>}}}></Drawer.Screen>
          {showAuthDraw === true ? (
            <Drawer.Screen name='HelloWorld' component={HelloWorldScreen} options={{drawerIcon: ({focused, size}) => {return <Ionicons name='paw' size={25}></Ionicons>}}}></Drawer.Screen>
            ) : null
          }  
          <Drawer.Screen name='Logout' component={Logout} options={{drawerIcon: ({focused, size}) => {return <Ionicons name='log-out' size={25}></Ionicons>}}}></Drawer.Screen>
        </Drawer.Navigator>
      );
    }

    return (
        // <AuthContext.Provider value={loginState}>        
          <NavigationContainer>  
            <Stack.Navigator>
              {props.loginToken !== null ? 
                (<Stack.Screen name='DrawerCotainer' component={DrawerContainer} options={{headerShown: false}}></Stack.Screen>) : 
                (<Stack.Screen name='RootStackScreen' component={RootStackScreen} options={{headerShown: false}}></Stack.Screen>)
              }              
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
                  headerShown: false,
                  headerTintColor: 'red',

                  drawerIcon: ({focused, size}) => {return <Ionicons name='scan-sharp' size={25}></Ionicons>}
                })}                
              ></Stack.Screen> 
            </Stack.Navigator>                
          </NavigationContainer>
        // </AuthContext.Provider>
    );
  };


  const mapStateToProps = (state) => {  
    return {
        loginToken: state.loginToken
    };
  }  
  export default connect(mapStateToProps)(App);
