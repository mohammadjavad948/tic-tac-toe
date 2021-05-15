import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import { Button, Text, TextInput } from "react-native-paper";

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    width: '80%',
    paddingTop: 50,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 20,
  },
});

export function AskName() {
  const [text, setText] = useState('');
  return (
    <View style={style.container}>
      <Text style={style.greeting}>Hi whats your name?</Text>
      <View style={style.name}>
        <TextInput
          label={'name'}
          mode={'outlined'}
          value={text}
          onChangeText={text => setText(text)}
        />
      </View>
      <Button mode={'contained'} loading={true}>
        Go
      </Button>
    </View>
  );
}
