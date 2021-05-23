import React from 'react';
import {View} from 'react-native';
import {playerStyle} from './playersStyle';

export function PlayerContainer() {
  return (
    <View style={playerStyle.container}>
      <BilBilak />
    </View>
  );
}

function BilBilak() {
  return (
    <View style={playerStyle.bilbilakContainer}>
      <View style={playerStyle.bilbilak}/>
    </View>
  );
}
