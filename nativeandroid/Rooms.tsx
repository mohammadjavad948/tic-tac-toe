import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import { Button, Card, IconButton, Text, Title } from "react-native-paper";
import {useTransition, a} from 'react-spring/native';
import {io} from 'socket.io-client';

const socket = io('https://tic-tac-toe-react-javad.herokuapp.com/');

const style = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  card: {
    width: '90%',
    position: 'absolute',
    padding: 5,
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

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
      socket.emit('register:name', 'test');
      socket.onAny(console.log);
    });
  }, []);

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
    <a.View style={[animation, style.card]}>
      <Card.Content style={style.cardContent}>
        <Text>{item}</Text>
        <IconButton icon="angle-right" color={'pink'} />
      </Card.Content>
    </a.View>
  );
}
