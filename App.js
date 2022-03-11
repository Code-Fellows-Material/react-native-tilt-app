import React from "react";
import { NativeBaseProvider  } from "native-base";
import AppBar from './components/Header';
import Gyro from './components/Gyro';
import OSensor from './components/OrientationSensor';

export default function App() {

  return (
    <NativeBaseProvider>
        <AppBar />
        <OSensor />
        <Gyro />
    </NativeBaseProvider>
  );
}