import React, {useState} from "react";
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Card, Text, Title} from 'react-native-paper';
import {useTransition, a} from 'react-spring/native';

const AnimatedCard = a(Card);

const style = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  card: {
    width: '90%',
    position: 'absolute',
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default function Rooms() {
  const [room, setRoom] = useState(['hmm', 'more', 'srfds', 'sfsef']);

  const transitions = useTransition(room, {
    from: (item, index) => {
      return {top: index * 60, opacity: 0};
    },
    leave: (item, index) => {
      return {top: index * 60, opacity: 0};
    },
    enter: (item, index) => {
      return {top: index * 80, opacity: 1};
    },
    update: (item, index) => {
      return {top: index * 80};
    },
  });

  return (
    <ScrollView
      style={style.container}
      contentContainerStyle={{alignItems: 'center'}}>
      <Title>Rooms</Title>
      <View style={[style.cardContainer, {height: (room.length + 1) * 80}]}>
        {transitions((animation, item) => (
          <RoomCard animation={animation} item={item} />
        ))}
      </View>
    </ScrollView>
  );
}

// @ts-ignore
function RoomCard({animation, item}) {
  return (
    <AnimatedCard style={[animation, style.card]}>
      <Card.Content style={style.cardContent}>
        <Text>{item}</Text>
        <Button mode={'contained'} compact={true} color={'pink'}>
          join
        </Button>
      </Card.Content>
    </AnimatedCard>
  );
}
