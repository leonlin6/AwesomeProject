import React, {useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
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
  ActivityIndicator
} from 'react-native';


import LoginData from '../APIs/LoginData';
import {setLoginToken} from '../actions/index'

const LoginScreen = (props) => {
  // const [ID , setID] = useState('');
  // const [password , setPassword] = useState('');
  // const [userToken, setUserToken] = useState(null);
  const [data, setData] = useState({
    id: '',
    pw: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
});

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [inputIDFocus, setInputIDFocus] = useState(false);
  const [inputPasswordFocus, setInputPasswordFocus] = useState(false);

  const [passwordShow, setPasswordShow] = useState(false);

  const IDWrapStyle = inputIDFocus? styles.inputWrapFocus : styles.inputWrap;
  const passwordWrapStyle = inputPasswordFocus? styles.inputWrapFocus : styles.inputWrap;

  const {height} = Dimensions.get("screen");
  const height_logo = height * 0.28;

  // const passQRdata = {
  //   name: 'Leon',
  //   age: 18,
  //   sex: 'male',
  //   location :{
  //     city: 'Taipei',
  //     state: '松山',
  //     country: 'Taiwan'
  //   }
  // }
  
  // const loginData = {
  //   name: 'Leon',
  //   age: 18,
  //   sex: 'male',
  //   pw: '1234',
  //   id: 'A123456789',
  //   location :{
  //     city: 'Taipei',
  //     state: '松山',
  //     country: 'Taiwan'
  //   },
  //   userAuth:{
  //     level: 0
  //   },
  //   deviceAuth:{
  //     camera:false,
  //     photo:false,      
  //   },
  //   isPasswordValid:true,
  //   isValidUser:true
  // }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [])

  useEffect(() => {
    // saveData();
  }, [])

  useEffect (() => {
    console.log('props.loginToken', props.loginToken);
  },
  [props.loginToken]

  )

  // const saveData = () => {
  //   try{
  //     AsyncStorage.setItem('@userID',LoginData.id);
  //     AsyncStorage.setItem('@userPassword',LoginData.pw);
  //     console.log('default save data work');
  //   }catch(error){
  //     console.error('error');
  //   }
  // }

  const onPressLogin = async () => {
    
    try{
      // const id = await AsyncStorage.getItem('@userID');
      // const pw = AsyncStorage.setItem('@userPassword');
      let hasID = false;
      let pwPass = false;
      let ooo = null;
      LoginData.forEach((item, index) => {
        if(data.id === item.id){
          hasID = true;
          if(data.pw === item.pw){
            pwPass = true;
            ooo = item;
          }
        }
      });

      if(!hasID){
        console.warn('No such account ID', item);
      }else if(!pwPass){
        console.warn('Wrong Password');
      }else{
        console.log('pass the certificat', );
        setData(
          {
            ...data,
            userToken:'administrator'
          }
        );

        // setLoginToken({userToken:'administrator'});
        props.setLoginToken(ooo);

        // console.log('props.loginToken',props.loginToken);
        // await AsyncStorage.setItem('@userToken', LoginData);
      }

    }catch(error){

    }
    
    // if(ID !== data.id){
    //   console.warn('No such accound ID');
    // }else if(password !== data.password){
    //   console.warn('Wrong password');
    // }else{
    //   props.navigation.navigate('QRScan', data);
    // }
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
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoWrap}>
          <View style={styles.circleWrap}>
            <View style={styles.circle}>
              <Image 
                style={styles.logo}
                source={require('../images/logo.png')}
                resizeMode="stretch"
              ></Image>
            </View>
          </View>
        </View>
        <Animatable.View
          animation="lightSpeedIn">
          <View>
            <Text style={styles.logoText}>Snowbridge</Text>
          </View>
        </Animatable.View>
      </View>
      <Animatable.View 
        animation="fadeInUpBig"
        style={styles.footer}>
        <View style={styles.inputContainer}>
          <View style={IDWrapStyle}>      
            <View style={styles.idIinput}>
              <TextInput
                  placeholder="身分證字號"
                  onChangeText={(val) => {handleIDChange(val)}}
                  style={{padding:0, margin:0}}
                  onFocus={() => {setInputIDFocus(true)}}
                  onBlur={() => {setInputIDFocus(false)}}
                />
            </View>
            <View style={styles.idInputIcon}>
              <Ionicons name='md-person-circle-sharp' size={25} ></Ionicons>
            </View>
          </View>
          <View style={passwordWrapStyle}>
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
  },
  header:{
    flex:2,
    justifyContent:'center',
    alignItems:'center'
  },
  footer:{
    flex:1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  loadingWrap:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoWrap:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 5
  },
  circleWrap: {
    backgroundColor: 'white',
    justifyContent:'center',
    alignItems:"center",
    padding: 5,
    borderRadius:100,

  },
  circle:{
    justifyContent:'center',
    alignItems:"center",
    borderWidth: 3,
    borderColor: 'black',
    borderRadius:100,
    width: 150,
    height: 150
  },
  logo:{
    alignItems: 'center',
    padding: 25,
  },
  logoText:{
    color:'white',
    fontSize: 36,
    marginBottom:50,
    fontFamily:"DancingScript-Regular"
  },  
  inputContainer:{
    flex:2,
    justifyContent: 'center',
    alignItems: 'center',

  },
  inputWrap:{
    width: 250,
    borderBottomWidth: 1, 
    borderColor: 'black',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    flexWrap:'nowrap',
    marginTop:25
  },  
  inputWrapFocus:{
    width: 250,    
    borderBottomWidth: 1, 
    borderColor: '#0f659d',    
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },  

  idIinput:{
    flex:4,
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
    flex:4,
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
    marginTop:25,
    paddingVertical:5
  }
});

const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken
  };
}

export default connect(mapStateToProps, {setLoginToken})(LoginScreen);