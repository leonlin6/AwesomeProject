import React, {useState} from 'react';
import { View, Text, Image, ScrollView, TextInput, StyleSheet, TouchableOpacity, Linking , Button} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const QRScanScreen = ({route}) => {
  const [QRCode, setQRCode] = useState('nothing QR now');

  const onPress = () => {
    console.log('press test work');
  }

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
  
  return (
    <ScrollView>
      <QRCodeScanner
        cameraStyle={{height:250, marginBottom:50}}
        topViewStyle={{height:250}}
        bottomViewStyle={{height:150}}
        // containerStyle={{height:200}}
        onRead={onSuccessLoad}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity 
            style={styles.buttonTouchable}
            onPress={onPress}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.body}>
        <View style={styles.container}>
          <Text style={styles.title}>{QRCode}</Text>
          <Text style={styles.description}>DESCRIPTION</Text>
        </View>
      </View>
      <View style={styles.btnArea}>
        <Button 
          onPress={onPressShowRoute}
          title='show Route param'></Button>
      </View>
    </ScrollView>
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
    padding: 16
  }
});

export default QRScanScreen;


