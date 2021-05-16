import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import { FAB, Button, Paragraph, Dialog, Portal, TextInput } from "react-native-paper";

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});

export function NewRoom() {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <View style={style.container}>
      <FAB icon={'plus'} onPress={showDialog} />

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Create New Room</Dialog.Title>
          <Dialog.Content>
            <TextInput mode={'outlined'} label={'room name'} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Create</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
