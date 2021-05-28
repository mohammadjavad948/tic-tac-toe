import React, {useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {playerStyle} from './playersStyle';
import {useSpring, animated, useTransition, config} from 'react-spring/native';
import {
  useIsGameStartedStore,
  useWinnerStore,
  useXIsNextStore,
} from './GameStore';
import {Title} from 'react-native-paper';

const Atitle = animated(Title);

export function PlayerContainer() {
  const [{x}, api] = useSpring(() => ({
    x: 0,
  }));
  const [up, setUp] = useState(false);

  function press() {
    if (up) {
      api.start({x: 0});
    } else {
      api.start({x: -1 * (Dimensions.get('window').height - 150)});
    }

    setUp(state => !state);
  }

  return (
    <animated.View
      style={[playerStyle.container, {transform: [{translateY: x}]}]}>
      <BilBilak press={press} />
      <Turns />
      <View style={playerStyle.playersContainer} />
    </animated.View>
  );
}

//@ts-ignore
function BilBilak({press}) {
  return (
    <View style={playerStyle.bilbilakContainer}>
      <TouchableOpacity onPress={press} style={playerStyle.bilbilak} />
    </View>
  );
}

function Turns() {
  const {started} = useIsGameStartedStore();
  const {xIsNext} = useXIsNextStore();
  const {winner} = useWinnerStore();

  const [text, changeText] = useState('');
  const transition = useTransition([text], {
    from: {
      move: 100,
      opacity: 0,
      position: 'absolute',
    },
    enter: {
      move: 0,
      opacity: 1,
    },
    leave: {
      move: -100,
      opacity: 0,
      position: 'absolute',
    },
    config: config.wobbly,
  });

  useEffect(() => {
    function showText(): string {
      if (winner !== null) {
        return 'Winner is ' + winner;
      }

      if (!started) {
        return 'Game not started';
      }

      return xIsNext ? 'O turn' : 'X turn';
    }

    changeText(showText());
  }, [started, xIsNext, winner]);

  return (
    <View style={playerStyle.turnsContainer}>
      {transition(({move, opacity, position}, el) => {
        // @ts-ignore
        return (
          <Atitle style={{transform: [{translateX: move}], opacity, position}}>
            {el}
          </Atitle>
        );
      })}
    </View>
  );
}
