import {Appearance, Dimensions, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {styles} from './gameStyle';
import {
  useBoardStore,
  usePlayerStore,
  useWinnerStore,
  useXIsNextStore,
  useIsGameStartedStore,
} from './GameStore';

// @ts-ignore
export default function Game({socket}) {
  const {addPlayer, removePlayer, sortPlayer} = usePlayerStore();
  const {set: setBoard} = useBoardStore();
  const {set: setXIsNext} = useXIsNextStore();
  const {set: setIsGameStarted} = useIsGameStartedStore();
  const {set: setWinner} = useWinnerStore();

  useEffect(() => {
    sortPlayer();

    socket.on('room:user:join', (res: any) => {
      addPlayer(res);
      sortPlayer();
    });

    socket.on('room:user:leave', (id: any) => {
      removePlayer(id);
      sortPlayer();
    });

    socket.on('game:board', (res: any) => {
      setBoard(res);
    });

    socket.on('game:xIsNext', (res: any) => {
      setXIsNext(res);
    });

    socket.on('game:start', (_: any) => {
      setIsGameStarted(true);
    });

    socket.on('game:stop', (_: any) => {
      setIsGameStarted(false);
    });

    socket.on('game:winner', (res: any) => {
      setWinner(res);

      setTimeout(() => {
        setWinner(null);
      }, 5000);
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
  const theme = Appearance.getColorScheme();
  const {started} = useIsGameStartedStore();

  function click() {
    if (!started) {
      return null;
    }

    console.log('click ' + index);
    socket.emit('game:move', index);
  }

  return (
    <View
      style={[
        {
          width,
          height: width,
          borderColor: theme === 'light' ? 'black' : 'white',
        },
        styles.tile,
      ]}>
      <TouchableOpacity onPress={click} style={styles.tileTouch}>
        <Text style={styles.tileText}>{el}</Text>
      </TouchableOpacity>
    </View>
  );
}
