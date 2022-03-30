import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, Button, Image} from 'react-native';


const DeeplinkScreen = (props) => {
   
  const deepData = props.route;
  // console.log('deepData:', deepData);
  console.log('props:', props);
  console.log('props.route:', props.route);

  return (
    <View style={styles.container}>
      <Text>{deepData.params.id}</Text>
      <Text>{deepData.params.name}</Text>

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
    flex:1,
    marginTop: 10,
    justifyContent:'center',
    alignItems:'center',
  },
  button:{

  },
  imageTest:{
    width: 300,
    height: 320,
  }
});


export default DeeplinkScreen;