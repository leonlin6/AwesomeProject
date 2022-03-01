import React, {useState, useEffect} from 'react';
import { View, Text, Image, ScrollView, TextInput, StyleSheet, TouchableOpacity, Linking , Button, Dimensions} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';

const QRScanScreen = ({route, navigation}) => {
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const [QRCode, setQRCode] = useState('nothing QR now');

  const onSuccessLoad = (e) => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
  }


  const onPressShowRoute = () => {
    console.log(route.params);
  }
  const onRead = (e) => {
    setQRCode(e.data);
    console.log('e= ', e);
  }

  const backButton = () => {
    navigation.goBack();
  }

  return (
    <View>
      <QRCodeScanner
        cameraStyle={{height:SCREEN_HEIGHT, margin:0, padding:0}}
        // containerStyle={{height:200}}
        onRead={onSuccessLoad}
        flashMode={RNCamera.Constants.FlashMode.torch}
        showMarker={true}
        customMarker={
          <View Style= {{flexDirection:'row'}}>
            <View style={styles.rectangleContainer}>
              <Ionicons name='ios-scan-outline' style={{color:'white'}} size={SCREEN_HEIGHT * 0.5}></Ionicons>
            </View>
          </View>

        }
      />
      <TouchableOpacity  onPress={backButton} style={{position:'absolute', top: 10, left: 10 ,borderRadius:100}}>
        <Ionicons 
          name = 'arrow-back-circle-sharp'
          size={50} 
          style={{color:'white'}}
        ></Ionicons>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  body:{
    marginVertical: 15
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16,
    backgroundColor: 'yellow'
  },
  screenOpacity:{
    backgroundColor: 'black',
    opacity: 0.6,
    flex:1,
    position: 'absolute'
  },
  rectangleContainer:{
    backgroundColor: 'black',
    opacity: 0.6,
    justifyContent:'center',
    alignItems: 'center',
     height:683,
     width:411,
  }
});

export default QRScanScreen;


