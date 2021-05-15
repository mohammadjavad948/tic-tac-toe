import React, { useEffect } from "react";
import {Provider as PaperProvider } from "react-native-paper";
import { AskName } from "./AskName";
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <PaperProvider>
      <AskName />
    </PaperProvider>
  );
}
