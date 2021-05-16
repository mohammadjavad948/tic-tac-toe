import React from 'react';
import { StyleSheet, View } from "react-native";
import {FAB} from 'react-native-paper';

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});

export function NewRoom() {
  return (
    <View style={style.container}>
      <FAB icon={'plus'} />
    </View>
  );
}
