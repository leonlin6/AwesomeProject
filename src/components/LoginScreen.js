import React, {useEffect, useState, useRef} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Animated,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';

import LoginData from '../APIs/LoginData';
import {setLoginToken} from '../actions/index'

const LOGO_CIRCLE_HEIGHT = 150;
const LOGO_SMALL_CIRCLE_HEIGHT = 75;
const LOGO_WIDTH = 75;
const LOGO_SMALL_WIDTH = 50;

const LoginScreen = (props) => {
  // const [ID , setID] = useState('');
  // const [password , setPassword] = useState('');
  // const [userToken, setUserToken] = useState(null);
  const initData = {
    name: '',
    age: 0,
    sex: '',
    pw: '',
    id: '',
    location :{
      city: '',
      state: '',
      country: ''
    },
    userAuth:{
      level: ''
    },
    deviceAuth:{
      camera:false,
      photo:false,      
    },
    isPasswordValid:true,
    isValidUser:true
  }

  const [data, setData] = useState(initData);

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [inputIDFocus, setInputIDFocus] = useState(false);
  const [inputPasswordFocus, setInputPasswordFocus] = useState(false);

  const [passwordShow, setPasswordShow] = useState(false);

  const IDWrapStyle = inputIDFocus? styles.inputWrapFocus : styles.inputWrap;
  const passwordWrapStyle = inputPasswordFocus? styles.inputWrapFocus : styles.inputWrap;

  // const {height} = Dimensions.get("screen");
  // const height_logo = height * 0.28;

  const [keyboardStatus, setKeyboardStatus] = useState(undefined);


  var resizeLogoCircleAnim = useRef(new Animated.Value(LOGO_CIRCLE_HEIGHT)).current;
  var resizeLogoAnim = useRef(new Animated.Value(LOGO_WIDTH)).current;

  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [])


  // run keyboard stuff
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      Animated.timing(resizeLogoCircleAnim,{
        duration: 500,
        toValue: LOGO_SMALL_CIRCLE_HEIGHT,
        useNativeDriver: false
      }).start();

      Animated.timing(resizeLogoAnim,{
        duration: 500,
        toValue: LOGO_SMALL_WIDTH,
        useNativeDriver: false
      }).start();
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(resizeLogoCircleAnim,{
        duration: 500,
        toValue: LOGO_CIRCLE_HEIGHT,
        useNativeDriver: false
      }).start();

      Animated.timing(resizeLogoAnim,{
        duration: 500,
        toValue: LOGO_WIDTH,
        useNativeDriver: false
      }).start();
    });


    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }
  ,[]);

  const onPressLogin = async () => { 

    try{
      // const id = await AsyncStorage.getItem('@userID');
      // const pw = await AsyncStorage.getItem('@userPassword');
      let hasID = false;
      let pwPass = false;
      let userInfoToken = null;

      //此段應該之後會做成打API去判斷，等回傳成功or失敗拿來做判斷就好
      LoginData.forEach((item, index) => {
        if(data.id === item.id){
          hasID = true;
          if(data.pw === item.pw){
            pwPass = true;
            userInfoToken = item;
          }
        }
      });

      //依API回傳結果呈現顯示畫面通知
      if(!hasID){
        console.warn('No such account ID');
      }else if(!pwPass){
        console.warn('Wrong Password');
      }else{
        console.log('pass the certificat');
        AsyncStorage.setItem('@userToken' , JSON.stringify(userInfoToken));
        setData(userInfoToken);
        props.setLoginToken(userInfoToken);
      }

    }catch(error){
      console.log('error', error);
    }
  }

  const handleIDChange = (val) => {
    if( val.trim().length >= 8 ) {
      setData({
          ...data,
          id: val,
          isPasswordValid: true
      });
    } else {
      setData({
          ...data,
          id: val,
          isPasswordValid: false
      });
    }
  }

  const handlePasswordChange = (val) => {
    if( val.trim().length >= 8 ) {
      setData({
          ...data,
          PeriodicWave: val,
          isPasswordValid: true
      });
    } else {
      setData({
          ...data,
          pw: val,
          isPasswordValid: false
      });
    }
  }

  const onPwIconPress = () => {
    setPasswordShow(!passwordShow);
  }
  
  if(isLoading){
    return(
      <View style={styles.loadingWrap}>
        <ActivityIndicator size='large'></ActivityIndicator>
      </View>
    )
  }

  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <View style={styles.logoWrap}>
          <View style={styles.circleWrap}>
            <Animated.View style={[styles.circle, {height:resizeLogoCircleAnim, width:resizeLogoCircleAnim}]}>
              <Animated.Image 
                style={[styles.logo, {width:resizeLogoAnim}]}
                source={require('../images/logo.png')}
                resizeMode="stretch"
              ></Animated.Image>
            </Animated.View>
          </View>
        </View>
        <Animatable.View
          animation="lightSpeedIn"
          style={styles.logoTextWrap}>
          <Text style={styles.logoText}>Snowbridge</Text>
        </Animatable.View>
      </View>
      <Animatable.View 
        animation="fadeInUpBig"
        style={styles.footer}>
        <View style={styles.inputContainer}>
          <View style={IDWrapStyle}> 
            <View style={styles.idInputIcon}>
              <Ionicons name='md-person-circle-sharp' size={25} ></Ionicons>
            </View>
            <View style={styles.idIinput}>
              <TextInput
                placeholder="身分證字號"
                onChangeText={(val) => {handleIDChange(val)}}
                style={{padding:0, margin:0}}
                onFocus={() => {setInputIDFocus(true)}}
                onBlur={() => {setInputIDFocus(false)}}
              />
            </View>
          </View>
          <View style={passwordWrapStyle}>
            <View style={styles.idInputIcon}>
              <Ionicons name='key' size={25} ></Ionicons>
            </View>
            <View style={styles.pwInput}>
              <TextInput
                style={{padding:0,margin:0}}
                placeholder="請輸入使用者密碼"
                onChangeText={(val) => {handlePasswordChange(val)}}
                onFocus={() => {setInputPasswordFocus(true)}}
                onBlur={() => {setInputPasswordFocus(false)}} 
                secureTextEntry={!passwordShow}             
              />
            </View>
            <View style={styles.passwordInputIcon}>                
              <TouchableOpacity  onPress={onPwIconPress}>
                <Ionicons 
                  name = {passwordShow ? 'md-eye' : 'md-eye-off'}
                  size={25} 
                ></Ionicons>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={onPressLogin}
          >
            <Text style={{color:'#0f659d'}}>Login</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {navigation.navigate('QRScan', passQRdata);}}
          >
            <Text style={{color:'#0f659d'}}>Go to QR</Text>
          </TouchableOpacity> */}
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    fontSize: 25,
    backgroundColor:'#0f659d',
    justifyContent:'flex-end',

  },
  header:{
    flex:2,
    justifyContent:'center',
    alignItems:'center',
    paddingTop: 30,
  },  
  loadingWrap:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200
  },
  logoWrap:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 5,
  },
  circleWrap: {
    backgroundColor: 'white',
    justifyContent:'center',
    alignItems:"center",
    padding: 5,
    borderRadius: 1000,
    minHeight: 75
  },
  circle:{
    justifyContent:'center',
    alignItems:"center",
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 1000, 
  },
  logo:{
    alignItems: 'center',
  },
  logoTextWrap:{
    flex: 1,

  },
  logoText:{
    color:'white',
    fontSize: 36,
    fontFamily:"DancingScript-Regular",
  },  
  footer:{
    flex:1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  inputContainer:{
    flex:2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputWrap:{
    width: 250,
    borderBottomWidth: 1, 
    borderColor: 'black',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap:'nowrap',
    marginBottom: 25
  },  
  inputWrapFocus:{
    width: 250,    
    borderBottomWidth: 1, 
    borderColor: '#0f659d',    
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 25

  },  

  idIinput:{
    flex:5,
    borderWidth: 0,
    paddingBottom:0,
    width: 100,
    height:25
  },
  idInputIcon:{
    flex:1,
    height:25,
  },
  pwInput:{
    flex: 4,
    borderWidth: 0,
    paddingBottom:0,
    width: 100,
    height:25
  },
  passwordInputIcon:{
    flex:1,
    height:25
  },
  loginBtn:{
    borderWidth: 1,      
    borderColor: '#0f659d',
    borderRadius: 15,
    width:250,
    alignItems:'center',    
    paddingVertical:5
  }
});

const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken
  };
}

export default connect(mapStateToProps, {setLoginToken})(LoginScreen);