import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FAB, Button, Dialog, Portal, TextInput} from 'react-native-paper';
import {useBoardStore, usePlayerStore} from './GameStore';
import {useHistory} from 'react-router-native';

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});

// @ts-ignore
export function NewRoom({socket}) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');

  const {set: setBoard} = useBoardStore();
  const {setPlayers} = usePlayerStore();

  const history = useHistory();

  const showDialog = () => setVisible(true);

  const hideDialog = () => {
    socket.emit('room:create', name, (res: any) => {
      if (!res.ok || name === '') {
        return null;
      }

      setPlayers(res.room.players);
      setBoard(res.room.board);

      setVisible(false);

      history.push('/game');
    });
  };

  return (
    <View style={style.container}>
      <FAB icon={'plus'} onPress={showDialog} />

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Create New Room</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode={'outlined'}
              label={'room name'}
              onChangeText={text => setName(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Create</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
