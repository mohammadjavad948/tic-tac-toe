import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  FAB,
  Button,
  Dialog,
  Portal,
  TextInput,
  Caption,
} from 'react-native-paper';
import {useBoardStore, usePlayerStore} from './GameStore';
import {useHistory} from 'react-router-native';

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  error: {
    color: 'red',
  },
});

// @ts-ignore
export function NewRoom({socket}) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [loding, setLoadin] = useState(false);
  const [error, setError] = useState('');

  const {set: setBoard} = useBoardStore();
  const {setPlayers} = usePlayerStore();

  const history = useHistory();

  const showDialog = () => setVisible(true);

  const hideDialog = () => {
    setLoadin(true);

    socket.emit('room:create', name, (res: any) => {
      setLoadin(false);

      if (!res.ok || name === '') {
        setError(res.message);
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
            {error !== '' ? (
              <Caption style={style.error}>{error}</Caption>
            ) : null}
          </Dialog.Content>
          <Dialog.Actions>
            <Button disabled={loding} loading={loding} onPress={hideDialog}>
              Create
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
