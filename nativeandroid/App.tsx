import React from 'react';
import {Text, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 50}}>yesss</Text>
      </View>
    </PaperProvider>
  );
}
