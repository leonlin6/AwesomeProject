import React, {useState} from 'react';
import { View, Text, Image, ScrollView, TextInput, StyleSheet, TouchableOpacity, Button} from 'react-native';
import { bikeSpotGet, getAuthorizationHeader } from '../APIs/APIs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HelloWorldScreen = () => {
  const [term, setTerm] = useState('');
  const [res, setRes] = useState([]);

  const onClickGetBikeSpot = async () => {
    console.log('term', term);
    try{
      const response = await bikeSpotGet.get(`Taipei?$filter=contains(StationName/Zh_tw,'${term}')`, 
        {
          headers:getAuthorizationHeader()
        }
      );
      setRes( response.data);
    }catch(error){
      console.log('error');
    }
  }


  const BikeSpotNames = () => {
    try{ 
      let result = res.map((item) => {
        console.log(item.StationAddress.Zh_tw);
        return(<Text key={item.StationAddress.Zh_tw}>站牌名稱：{item.StationAddress.Zh_tw}</Text>);
      })
      return (<ScrollView>{result}</ScrollView>);

    }catch(error){
      console.log('data is undefined');
      return <View></View>;
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <BikeSpotNames></BikeSpotNames>
      </View>
      <View style={styles.inputArea}>
        <View style={styles.inputWrap}>
          <TextInput
            onChangeText={setTerm}
            placeholder="Please insert bikeSpot term"
            style={{padding:0,margin:0}}
          ></TextInput>
        </View>
        <View style={styles.buttonArea}>
          <Button
            title='submit'         
            onPress={onClickGetBikeSpot}>
          </Button>       
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    padding: 10
  },
  info:{
    flex:4,
    backgroundColor: 'skyblue'
  },
  inputArea:{
    flex:2,

  },
  inputWrap:{
    borderBottomWidth: 1,
    borderColor: 'black'
  },
  buttonArea:{
    marginTop: 10
  }

});



export default HelloWorldScreen;