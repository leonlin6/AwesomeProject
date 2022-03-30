import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, Button, Image} from 'react-native';
import { bikeSpotGet, getAuthorizationHeader } from '../APIs/APIs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';
import SignatureCapture from 'react-native-signature-capture';
import SignatureCanvas from "react-native-signature-canvas";
import { createIconSetFromFontello } from 'react-native-vector-icons';

const SignatureScreen = (props) => {
  const signRef = useRef(null);
  const [showSignature, setShowSignature] = useState(false);
  const [imagePath, setImagePath] = useState('');
  const [viewMode, setViewMode] = useState('portrait');
  
  const onSaveEvent = (data) => {
    setShowSignature(false);
    // console.log('signData', data);
    setImagePath(data.encoded);

    signRef.current.saveImage();

    if(viewMode === 'portrait'){
      setViewMode('landscape');  
      console.log('landscape');    
    }else{
      setViewMode('portrait');
      console.log('portrait');    

    }
  }

  const onResetEvent = () => {
    signRef.current.resetImage();

    console.log('drag work');
  }

  const onDragEvent = () => {

    console.log('drag work');
  }
  
  const onPressConfirm = () => {

    setShowSignature(true);
    if(viewMode === 'portrait')
      setViewMode('landscape');
    else
      setViewMode('portrait');
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
            viewMode={viewMode}/>
        ):        
        ( 
          <View style={styles.buttonArea}>
            <Button style={styles.button} title='Pree Me To Show' onPress={onPressConfirm}></Button>
            <Image style={styles.imageTest} source={{uri:`data:image/png;base64,${imagePath}`}}></Image>
          </View>

        )
      }
    </View>
  //   <View style={styles.container}>
  //   <Text style={{alignItems:"center",justifyContent:"center", fontSize:20}}>Signature Capture Extended </Text>
  //   {showSignature ? 
  //     (<SignatureCanvas
  //         style={{flex:1}}
  //         ref={signRef}
  //         // onEnd={}
  //         onOK={(img) => {setImagePath(img)}}
  //         onEmpty={() => console.log("empty")}
  //         descriptionText="SignTEst1234"
  //       ></SignatureCanvas>
  //     ):        
  //     ( 
  //         <View style={styles.buttonArea}>
  //           <Button style={styles.button} title='Pree Me To Show' onPress={()=>{setShowSignature(true)}}></Button>
  //           <Image style={styles.imageTest} source={{uri:`data:image/png;base64,${imagePath}`}}></Image>
  //         </View>

  //     )
  //   }
    

  // </View>
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
    // flexDirection:'row'
    
  },
  button:{

  },
  imageTest:{
    width: 300,
    height: 320,


  }

});


export default SignatureScreen;