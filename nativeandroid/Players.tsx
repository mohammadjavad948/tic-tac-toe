import React from 'react';
import { TouchableOpacity, View } from "react-native";
import {playerStyle} from './playersStyle';
import { useDrag, useGesture } from "react-use-gesture";
import { useSpring, animated } from 'react-spring/native';

export function PlayerContainer() {
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  function press(){
    console.log('press');
  }

  return (
    <animated.View style={[playerStyle.container, {x}]}>
      <BilBilak press={press} />
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
