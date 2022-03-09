import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, Button} from 'react-native';
import { bikeSpotGet, getAuthorizationHeader } from '../APIs/APIs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';
import SignatureCapture from 'react-native-signature-capture';
import { createIconSetFromFontello } from 'react-native-vector-icons';

const SignatureScreen = (props) => {
  const signRef = useRef(null);
  const [showSignature, setShowSignature] = useState(false);

  const onSaveEvent = (data) => {
    setShowSignature(false);
    console.log('signData', data);
    signRef.current.saveImage();
  }

  const onResetEvent = () => {
    signRef.current.resetImage();

    console.log('drag work');
  }

  const onDragEvent = () => {

    console.log('drag work');
  }
  
  return (
    <View style={styles.container}>
      <Text style={{alignItems:"center",justifyContent:"center", fontSize:20}}>Signature Capture Extended </Text>
      {showSignature ? 
        (<SignatureCapture
            style={{flex:1}}
            ref={signRef}
            onSaveEvent={onSaveEvent}
            onDragEvent={onDragEvent}
            saveImageFileInExtStorage={false}
            showNativeButtons={true}
            showTitleLabel={false}
            backgroundColor="white"
            strokeColor="black"
            minStrokeWidth={4}
            maxStrokeWidth={4}
            viewMode={"portrait"}/>
        ):        
        (<View style={styles.buttonArea}>
          <Button title='Pree Me To Show' onPress={()=>{setShowSignature(true)}}></Button>
        </View>)
      }
      

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
    flexDirection:'row'
    
  }

});



export default SignatureScreen;