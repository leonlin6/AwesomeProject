import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {setLoginToken} from '../actions/index'
import AsyncStorage from "@react-native-async-storage/async-storage";


const Logout = (props) => {
    useEffect(() => {
      props.setLoginToken(null);
      return () => {props.setLoginToken(null);}
    },[]);

    // 登出時移除暫存的資料
    useEffect(()=>{
      return () => {
        AsyncStorage.removeItem('@userToken');
      }
    },[]);



    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size='large'></ActivityIndicator>
      </View>
      );
}


  
const styles = StyleSheet.create({
  loadingWrap:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken
  };
}

export default connect(mapStateToProps, {setLoginToken})(Logout);