import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {useNameStore} from './nameStore';
import {useHistory} from 'react-router-native';
import {Socket} from 'socket.io-client';

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

interface Prop {
  socket: Socket;
}

export function AskName(props: Prop) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const {set: setName} = useNameStore();

  const history = useHistory();

  function saveName() {
    setLoading(true);

    props.socket.emit('register:name', text, (call: any) => {
      if (call.done) {
        setName(text);
        history.push('/room');
      }
    });
  }

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
      <Button
        disabled={loading}
        onPress={saveName}
        mode={'contained'}
        loading={loading}>
        Go
      </Button>
    </View>
  );
}
