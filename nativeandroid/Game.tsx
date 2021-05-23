import {Dimensions, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {styles} from './gameStyle';
import {useBoardStore} from './GameStore';

// @ts-ignore
export default function Game({socket}) {
  const {set: setBoard} = useBoardStore();

  useEffect(() => {
    socket.on('game:board', (res: any) => {
      setBoard(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Board socket={socket} />
    </View>
  );
}

// @ts-ignore
function Board({socket}) {
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
          <Tile
            socket={socket}
            width={width}
            el={el}
            key={index}
            index={index}
          />
        );
      })}
    </View>
  );
}

// @ts-ignore
function Tile({width, el, index, socket}) {
  function click() {
    console.log('click ' + index);
    socket.emit('game:move', index);
  }

  return (
    <View style={[{width, height: width}, styles.tile]}>
      <TouchableOpacity onPress={click} style={styles.tileTouch}>
        <Text>{el}</Text>
      </TouchableOpacity>
    </View>
  );
}
