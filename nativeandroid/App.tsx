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
import {useConnectionStore} from './connectionStore';
import {Connection} from './Connection';
import {io} from 'socket.io-client';

const socket = io('https://heroku-i-love-you.herokuapp.com/');

export default function App() {
  const {connect: connected, set: setConnection} = useConnectionStore();

  useEffect(() => {
    SplashScreen.hide();

    socket.on('connect', () => {
      console.log('connected');

      setConnection(true);

      socket.onAny(console.log);

      socket.on('disconnect', () => {
        setConnection(false);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NativeRouter>
      <PaperProvider
        settings={{
          icon: props => <Icon {...props} />,
        }}>
        {connected ? <Routing /> : <Connection />}
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
      right: 300,
    },
    enter: {
      opacity: 1,
      position: 'absolute',
      right: 0,
    },
    leave: {
      opacity: 0,
      position: 'absolute',
      right: -300,
    },
  });

  return transitions((props, item) => (
    // @ts-ignore
    <a.View style={[props, {width: '100%', height: '100%'}]}>
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
