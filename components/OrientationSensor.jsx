import React, { useState, useEffect } from 'react';
import { StatusBar, Dimensions, Text, View } from 'react-native';
import {useColorModeValue} from 'native-base'
import { DeviceMotion } from 'expo-sensors';
import Svg, { Circle, Line } from 'react-native-svg';

const { height, width } = Dimensions.get('window');
const centerX = width / 2,
  centerY = height / 2;

export default function OSensor() {


  const [data, setData] = useState({
    beta: '',
    gamma: '',
  });

  useEffect(() => {
    _subscribe();
    StatusBar.setHidden(true, 'fade');
    return () => {
      _unsubscribe();
    };
  }, []);

  const _setInterval = () => {
    DeviceMotion.setUpdateInterval(77);
  };

  const _subscribe = () => {
    DeviceMotion.addListener((devicemotionData) => {
      setData(devicemotionData.rotation);
    });
    _setInterval();
  };

  const _unsubscribe = () => {
    DeviceMotion.removeAllListeners();
  };

  let { beta, gamma } = data;
  gamma = round(gamma);
  beta = round(beta);

  const gammaAlign = gamma <= 1.57 && gamma >= -1.57;
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: useColorModeValue("#FFF", "#000"),
      }}
    >
      <Svg height={height} width={width} originX={centerX} originY={centerY}>
        <Circle
          cx={centerX + (gamma * width) / 2}
          cy={centerY + (beta * height/2) / 6}
          r='30'
          fill={useColorModeValue("#6200ee", "#50BFC3")}
        />
      </Svg>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}
