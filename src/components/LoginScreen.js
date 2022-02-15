import React, {useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions,
  Animated
} from 'react-native';

import * as Animatable from 'react-native-animatable';


const LoginScreen = ({navigation}) => {
  const [ID , setID] = useState('');
  const [password , setPassword] = useState('');

  const [returnID , setReturnID] = useState('');
  const [returnPassword , setReturnPassword] = useState('');

  const [inputIDFocus, setInputIDFocus] = useState(false);
  const [inputPasswordFocus, setInputPasswordFocus] = useState(false);

  const [passwordShow, setPasswordShow] = useState(false);

  const IDWrapStyle = inputIDFocus? styles.inputWrapFocus : styles.inputWrap;
  const passwordWrapStyle = inputPasswordFocus? styles.inputWrapFocus : styles.inputWrap;

  const {height} = Dimensions.get("screen");
  const height_logo = height * 0.28;

  const passQRdata = {
    name: 'Leon',
    age: 18,
    sex: 'male',
    location :{
      city: 'Taipei',
      state: '松山',
      country: 'Taiwan'
    }
  }

  
  const loginData = {
    name: 'Leon',
    age: 18,
    sex: 'male',
    pw: '1234',
    id: 'A123456789',
    location :{
      city: 'Taipei',
      state: '松山',
      country: 'Taiwan'
    },
    userAuth:{
      level: 0

    },
    deviceAuth:{
      camera:false,
      photo:false,
      
    }
  }

  const saveData = () => {
    try{
      AsyncStorage.setItem('@userID',ID);
      AsyncStorage.setItem('@userPassword',password);
    }catch(error){
      console.error('error');
    }
  }



  const onPressLogin = () => {
    // saveData();
    if(ID !== loginData.id){
      console.log('No such accound ID');
    }else if(password !== loginData.pw){
      console.log('Wrong password');
    }else{
      navigation.navigate('QRScan', data);
    }
  }

  const onPwIconPress = () => {
    setPasswordShow(!passwordShow);
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
                  onChangeText={setID}
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
                onChangeText={setPassword}
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
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {navigation.navigate('QRScan', passQRdata);}}
          >
            <Text style={{color:'#0f659d'}}>Go to QR</Text>
          </TouchableOpacity>
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

export default LoginScreen;