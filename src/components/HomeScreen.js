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
  Dimensions
} from 'react-native';



const HomeScreen = ({navigation}) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const {height} = Dimensions.get("screen");
  const height_logo = height * 0.28;


  const saveData = () => {
    try{
      AsyncStorage.setItem('@userID',ID);
      AsyncStorage.setItem('@userPassword',password);
    }catch(error){
      console.error('error');
    }
  }


  const onPressToQR = () => {
    navigation.navigate('QRScan');
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
      </View>
      <View style={styles.footer}>
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Welcome to Snowbridge</Text>
          
          <Text style={styles.content}>It's the Snowbridge homePage</Text>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={onPressToQR}
          >
            <Text style={{color:'#0f659d'}}>To QR Scan Page</Text>
            <Ionicons color='#0f659d' size={20} name="chevron-forward"></Ionicons>
          </TouchableOpacity>
        </View>
      </View>

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
    flex:3,
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
    justifyContent: 'center',
    padding: 5,
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
  loginContainer:{
    flex:2,
    padding: 0,
    margin: 0,
    justifyContent: 'flex-start'
  },
  title:{
    fontSize: 36,
     
  }, 
  content:{

  },
  loginBtn:{
    borderWidth: 1,      
    borderColor: '#0f659d',
    borderRadius: 15,
    alignItems:'center',
    flexDirection: 'row',
    justifyContent:'center',
    marginTop:20,
    marginBottom:20,

    paddingVertical:5
  }
});

export default HomeScreen;