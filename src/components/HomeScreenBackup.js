import React, {useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Image, ScrollView, TextInput, StyleSheet, TouchableOpacity, Button, TouchableHighlight} from 'react-native';


const HomeScreen = () => {
  const [userId ,setUserId] = useState('');
  const [password ,setPassword] = useState('');

  const onClickGetData = async () => {

    try{
      setUserId(await AsyncStorage.getItem('@userID'));
      setPassword(await AsyncStorage.getItem('@userPassword'));
    }catch(error){
      console.error('error');
    }
  }
  
  const styles = StyleSheet.create({
    body:{
      flex:1,
      padding: 20
    },
    infoArea:{
      flex:3,
      borderWidth: 5,
      borderTopLeftRadius: 20,
      borderBottomRightRadius: 20,
      padding: 20,
      borderColor:'black'
    },
    infoText : {
      color: 'red',
      fontSize: 16
    },
    buttonArea:{
      flex:1,
      marginTop: 20,
      borderColor:'black',

    },
    buttonText:{
      color: 'white',
      fontSize: 17,
      // fontWeight: 'bold',
      backgroundColor: 'blue',
      borderRadius: 5,
      padding:5,
      textAlign: 'center'      
    }
  
  });

  return (
    <View style={styles.body}>
      <View style={styles.infoArea}>
        <Text style={styles.infoText}>HomeScreen</Text>
        <Text style={styles.infoText}>UserId:{userId}</Text>
        <Text style={styles.infoText}>UserPW:{password}</Text>
      </View>
      <View style={styles.buttonArea}>
        <TouchableOpacity 
          onPress={onClickGetData}
          underlayColor='#A7050E'>     
          <Text style={styles.buttonText}>Get local Data</Text>     
        </TouchableOpacity>
        {/* <Button title={'Get local Data'}></Button> */}
      </View>
    </View>
  );
}


export default HomeScreen;