import React, { useEffect, useRef, useState } from "react";
import { Dimensions, PanResponder, ScrollView, TouchableOpacity, View } from "react-native";
import {playerStyle} from './playersStyle';
import {useSpring, animated, useTransition, config} from 'react-spring/native';
import {
  useIsGameStartedStore,
  usePlayerStore,
  useWinnerStore,
  useXIsNextStore,
} from './GameStore';
import {Text, Title} from 'react-native-paper';

const Atitle = animated(Title);

export function PlayerContainer() {
  const [{x}, api] = useSpring(() => ({
    x: 0,
    config: config.gentle
  }));
  const [up, setUp] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, state) => {
        api.start({
          x: state.dy
        })
      },
      onPanResponderRelease: (e, state) => {
        const dimension = (Dimensions.get('window').height - 150) / 2;

        if ((state.dy * -1) > dimension){
          api.start({x: -1 * (Dimensions.get('window').height - 150)});
          setUp(true);
        } else {
          api.start({x: 0});
          setUp(true);
        }
      }
    })
  ).current;

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
      style={[playerStyle.container, {transform: [{translateY: x}]}]}
    >
      <BilBilak {...panResponder.panHandlers} press={press} />
      <Turns />
      <AllPlayer />
    </animated.View>
  );
}

//@ts-ignore
function BilBilak({press, ...props}) {
  return (
    <View style={playerStyle.bilbilakContainer} {...props}>
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

function AllPlayer() {
  const {players} = usePlayerStore();

  const transitions = useTransition(players, {
    from: (item, index) => {
      return {top: index * 40, opacity: 0};
    },
    leave: (item, index) => {
      return {top: index * 40, opacity: 0};
    },
    enter: (item, index) => {
      return {top: index * 70 + 20, opacity: 1};
    },
    update: (item, index) => {
      return {top: index * 70 + 20};
    },
  });

  return (
    <ScrollView style={playerStyle.playersContainer}>
      <View
        style={[playerStyle.playerView, {height: (players.length + 1) * 60}]}>
        {transitions((style, el) => (
          <Player style={style} player={el} />
        ))}
      </View>
    </ScrollView>
  );
}

// @ts-ignore
function Player({style, player}) {
  return (
    <animated.View style={[playerStyle.playerCard, style]}>
      <Text style={playerStyle.playerIcon}>{player.role}</Text>
      <Text style={playerStyle.playerName}>{player.name}</Text>
    </animated.View>
  );
}
