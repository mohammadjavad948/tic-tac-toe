import React, {useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {playerStyle} from './playersStyle';
import {useSpring, animated} from 'react-spring/native';

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
    <animated.View style={[playerStyle.container, {transform: [{translateY: x}]}]}>
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

function Turns(){

  return (
    <View style={playerStyle.turnsContainer}></View>
  )
}
