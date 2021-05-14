import React from 'react';
import {Text, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <View>
        <Text>Hmm</Text>
      </View>
    </PaperProvider>
  );
}
