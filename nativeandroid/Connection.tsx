import React from 'react';
import {StyleSheet, View} from 'react-native';
import { ActivityIndicator, Title } from "react-native-paper";
import Logo from './Logo';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  margin: {
    marginLeft: 20,
  },
});

export function Connection() {
  return (
    <View style={style.container}>
      <Logo style={style.image} />
      <View style={style.text}>
        <Title style={style.margin}>Connecting</Title>
      </View>
    </View>
  );
}
