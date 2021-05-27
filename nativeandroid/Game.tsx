import {
  Appearance,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
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

  const [interval, SetInterval] = useState(null);
  const [ping, setPing] = useState(100);

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

    function calculatePing() {
      const start = Date.now();

      // volatile, so the packet will be discarded if the socket is not connected
      socket.volatile.emit('ping', () => {
        const latency = Date.now() - start;

        console.log(latency);
        setPing(latency);
      });
    }

    calculatePing();

    const inter = setInterval(() => {
      calculatePing();
    }, 5000);

    // @ts-ignore
    SetInterval(inter);

    return () => {
      // @ts-ignore
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Ping ping={ping} />
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

// @ts-ignore
function Ping({ping}) {
  let color = '';

  if (ping <= 150) {
    color = '#24ba02';
  } else if (ping < 500) {
    color = '#e6a100';
  } else {
    color = '#c4060c';
  }

  return (
    <View style={[styles.ping, {backgroundColor: color}]}>
      <StatusBar backgroundColor={color} />
      <Text style={{fontSize: 15}}>ping : {ping}</Text>
    </View>
  );
}
