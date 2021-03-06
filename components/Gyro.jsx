import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import {useColorModeValue} from 'native-base'
  

export default function Gyro() {

  const styles = StyleSheet.create(
    {
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 10,
      backgroundColor: useColorModeValue("#FFF", "#000")
    },
    text: {
      fontSize: 28,
      textAlign: 'center',
      color: useColorModeValue("#000", "#FFF")
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'stretch',
      marginTop: 15,
      marginHorizontal: 20,
      padding: 0
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: useColorModeValue("#6200ee", "#50BFC3"),
      color: 'white',
      padding: 10,
      margin: 10,
      borderLeftWidth: 3,
      borderRightWidth: 3,
      borderTopWidth: 3,
      borderBottomWidth: 3,
      borderColor: 'black',
      borderRadius: 8
    },
    middleButton: {
      borderLeftWidth: 3,
      borderRightWidth: 3,
      borderTopWidth: 3,
      borderBottomWidth: 3,
      borderColor: 'black',
      borderRadius: 8
    },
  });
  

  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => {
    Gyroscope.setUpdateInterval(1000);
  };

  const _fast = () => {
    Gyroscope.setUpdateInterval(16);
  };

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener(gyroscopeData => {
        setData(gyroscopeData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const { x, y, z } = data;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gyroscope:</Text>
      <Text style={styles.text}>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}

