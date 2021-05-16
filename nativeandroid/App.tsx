import React, {useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {AskName} from './AskName';
import SplashScreen from 'react-native-splash-screen';
import {NativeRouter, Switch, Route} from 'react-router-native';
import Rooms from './Rooms';
import {NewRoom} from './NewRoom';
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
        <Switch>
          <Route path="/">
            <Rooms />
            <NewRoom />
          </Route>
          <Route path="/sss" exact>
            <AskName />
          </Route>
        </Switch>
      </PaperProvider>
    </NativeRouter>
  );
}
