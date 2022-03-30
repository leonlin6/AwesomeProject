 
import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Platform,
  StyleSheet,
  TouchableHighlight,
  SafeAreaView,
  TextInput,
  Modal
} from 'react-native';
import TouchID from 'react-native-touch-id';

import {connect} from 'react-redux';
import LoginData from '../APIs/LoginData';
import {setLoginToken} from '../actions/index'


const optionalConfigObject = {
  title: 'Authentication Required', // Android
  imageColor: '#e00606', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Touch sensor', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};



const FingerprintScreen = (props) => {

  const [modalShow, setModalShow] = useState(false);

  const handleBiometric = () => {
    TouchID.authenticate('請使用指紋驗證!', {
      title: '請使用指紋驗證!',
    })
      .then(() => {
        const userInfoToken = LoginData[0];
        props.setLoginToken(userInfoToken);

      })
      .catch((error) => {
        Alert.alert('fail');
        console.log(error);
      });
  }



  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#444"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#444"
      />
      <TouchableOpacity style={styles.button}>
        <Text>Enter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBiometric} style={styles.button}>
        <Text>Enter with Fingerprint</Text>
      </TouchableOpacity>
      {/* <Modal
        animationType='slide'
        style={styles.modal}
        transparent={true}
        ></Modal> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#19181f',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 45,
    borderWidth: 2,
    borderColor: '#7159c1',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    width: 200,
    height: 45,
    borderWidth: 2,
    borderColor: '#7159c1',
    backgroundColor: '#7159c1',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal:{
    backgroundColor: '#333',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    alignItems:'center',
    height: 40
  }
});

const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken
  };
}

export default connect(mapStateToProps, {setLoginToken})(FingerprintScreen);