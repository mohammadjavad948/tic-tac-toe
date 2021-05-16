import React, {useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {AskName} from './AskName';
import SplashScreen from 'react-native-splash-screen';
import {NativeRouter, Switch, Route, useLocation} from 'react-router-native';
import {a, useTransition} from 'react-spring/native';
import Rooms from './Rooms';
import {NewRoom} from './NewRoom';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NativeRouter>
      <PaperProvider
        settings={{
          icon: props => <Icon {...props} />,
        }}>
        <Routing />
      </PaperProvider>
    </NativeRouter>
  );
}

function Routing() {
  const location = useLocation();
  const transitions = useTransition(location, {
    from: {
      opacity: 0,
      position: 'absolute',
    },
    enter: {
      opacity: 1,
      position: 'relative',
    },
    leave: {
      opacity: 0,
      position: 'absolute',
    },
  });

  return transitions((props, item) => (
    // @ts-ignore
    <a.View style={[props, {flex: 1}]}>
      <Switch location={item}>
        <Route path="/room">
          <Rooms />
          <NewRoom />
        </Route>
        <Route path="/" exact>
          <AskName />
        </Route>
      </Switch>
    </a.View>
  ));
}
