import React, { useEffect } from "react";
import {Provider as PaperProvider } from "react-native-paper";
import { AskName } from "./AskName";
import SplashScreen from 'react-native-splash-screen';
import { NativeRouter, useLocation, Switch, Route } from "react-router-native";
import { useTransition, animated }from 'react-spring/native';
import { View } from "react-native";

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const location = useLocation();
  const transitions = useTransition(location, {
    from: {
      right: -100,
      opacity: 0,
    },
    enter: {
      right: 0,
      opacity: 1,
    },
    leave: {
      right: 100,
      opacity: 0,
    },
  });

  return (
    <NativeRouter>
      <PaperProvider>
        <View style={{position: 'relative', flex: 1}}>
          {transitions((props, item) => (
            <animated.View style={[{position: 'absolute'}, props]}>
              <Switch location={item}>
                <Route path="/" exact component={AskName} />
              </Switch>
            </animated.View>
          ))}
        </View>

      </PaperProvider>
    </NativeRouter>
  );
}
