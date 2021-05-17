import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Card, Divider, IconButton, Text, Title} from 'react-native-paper';
import {useTransition, a} from 'react-spring/native';
import {Socket} from 'socket.io-client';

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

interface Prop {
  socket: Socket;
}

export default function Rooms(props: Prop) {
  const [room, setRooms] = useState<string[]>([]);

  useEffect(() => {
    props.socket.emit('rooms:all', (res: any) => {
      setRooms(res.rooms);
    });

    props.socket.on('room:new', (name: string) => {
      if (room.includes(name)) return null;

      setRooms(s => {
        return [...s, name];
      });
    });

    props.socket.on('room:delete', (name: string) => {
      setRooms(s => {
        const newList = s.filter(e => e !== name);

        return newList;
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  function join() {
    console.log(item);
  }

  return (
    <a.View style={[animation, style.card]}>
      <Card.Content style={style.cardContent}>
        <Text>{item}</Text>
        <IconButton onPress={join} icon="angle-right" color={'pink'} />
      </Card.Content>
      <Divider />
    </a.View>
  );
}
