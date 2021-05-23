import {Dimensions, View} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {styles} from './gameStyle';
import {useBoardStore} from './GameStore';

export default function Game() {
  return (
    <View style={styles.container}>
      <Board />
    </View>
  );
}

function Board() {
  const [width, setWidth] = useState(0);
  const {board} = useBoardStore();

  useEffect(() => {
    const w = Dimensions.get('window').width;

    if (w > 600) {
      setWidth((600 - 20) / 3);
    } else {
      setWidth((w - 20) / 3);
    }
  }, []);

  return (
    <View style={styles.board}>
      {board.map((el, index) => {
        return (
          <View key={index} style={[{width, height: width}, styles.tile]}>
            {el}
          </View>
        );
      })}
    </View>
  );
}
