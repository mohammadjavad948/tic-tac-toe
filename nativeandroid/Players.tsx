import React, {useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {playerStyle} from './playersStyle';
import {useSpring, animated} from 'react-spring/native';

export function PlayerContainer() {
  const [{top}, api] = useSpring(() => ({
    top: Dimensions.get('window').height - 100,
  }));
  const [up, setUp] = useState(false);

  function press() {
    if (up) {
      api.start({top: Dimensions.get('window').height - 100});
    } else {
      api.start({top: 50});
    }

    setUp(state => !state);
  }

  return (
    <animated.View style={[playerStyle.container, {top}]}>
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
