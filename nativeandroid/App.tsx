import React, { useEffect } from "react";
import {Provider as PaperProvider } from "react-native-paper";
import { AskName } from "./AskName";
import SplashScreen from 'react-native-splash-screen';
import { NativeRouter, Switch, Route } from "react-router-native";

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NativeRouter>
      <PaperProvider>
        <Switch>
          <Route path="/" exact>
            <AskName />
          </Route>
        </Switch>
      </PaperProvider>
    </NativeRouter>
  );
}
