import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import { ActivityIndicator, Button, Title } from "react-native-paper";

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
    marginLeft: 20
  },
});

export function Connection() {
  return (
    <View style={style.container}>
      <Image source={require('./logo.png')} style={style.image} />
      <View style={style.text}>
        <ActivityIndicator animating={true} />
        <Title style={style.margin}>Connecting</Title>
      </View>
    </View>
  );
}
