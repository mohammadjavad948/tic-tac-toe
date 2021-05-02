import {Socket} from "socket.io-client";
import {FC, useEffect, useState} from "react";
import style from './roomSelection.module.css';
import {Button, Card, CardContent, TextField, Typography, useTheme} from "@material-ui/core";
import {useTransition, config, a} from 'react-spring';
import {useGameStore, usePlayerStore} from "./GameStore";

const AnimatedCard = a(Card)

interface Props{
    socket: Socket
}

export const RoomSelection: FC<Props> = (props) => {

    const [rooms, setRooms] = useState<string[]>([]);
    const {set: setGameStore} = useGameStore();
    const {setPlayers} = usePlayerStore();

    const transitions = useTransition(
        rooms,
        {
            from: (item, index) => {
                return { y: index * 60, opacity: 0 }
            },
            leave: (item, index) => {
                return { y: index * 60, opacity: 0 }
            },
            enter: (item, index) => {
                return { y: index * 80, opacity: 1 }
            },
            update: (item, index) => {
                return { y: index * 80 }
            },
        }
    )
    useEffect(() => {
        props.socket.on('connect', () => {
            props.socket.emit('rooms:all', (res: any) => {
                setRooms(res.rooms)
            });

            props.socket.on('room:new', (name: string) => {
                setRooms(s => {
                    return [...s, name]
                })
            })

            props.socket.on('room:delete', (name: string) => {
                setRooms(s => {
                    const newList = s.filter(e => e !== name);

                    return newList
                })
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function create(name: any){
        props.socket.emit('room:create', name, (res: any) => {
            if (res.ok){
                setPlayers(res.room.players)
                setGameStore(true);
            }
        })
    }

    function join(name: any){
        props.socket.emit('room:join', name, (res: any) => {
            setPlayers(res.room.players);
            setGameStore(true);
        });
    }

    return (
        <div className={style.container}>
           <NewRoom create={create}/>
           <Typography style={{marginTop: '30px'}} variant={"h5"}>Rooms</Typography>
           <div className={style.roomsContainer} style={{height: rooms.length * 90}}>
               {transitions((style, item) => (
                   <RoomCard join={join} name={item} style={style}/>
               ))}
           </div>
        </div>
    )
}

// @ts-ignore
function NewRoom({create}){

    const [name, setName] = useState('');

    function change(e: any){
        setName(e.target.value);
    }

    function cr(){
        create(name);
    }

    return (
        <div>
            <Typography variant={'h5'}>New Room</Typography>
            <div className={style.form}>
                <TextField label={"name"} onChange={change} variant={"outlined"}/>
                <Button variant={"contained"} onClick={cr} disabled={name === ''} color={"primary"}>create</Button>
            </div>
        </div>
    )
}

// @ts-ignore
function RoomCard({name, style, join}){

    const theme = useTheme();

    return (
        <AnimatedCard
            variant={"outlined"}
            style={{
                background: theme.palette.background.default,
                width: '100%',
                position: 'absolute',
                top: style.y.to((y: any) => y + 'px'),
                opacity: style.opacity
            }}>
            <CardContent style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Typography variant={"body1"}>{name}</Typography>
                <Button onClick={() => join(name)} variant={"outlined"} size={"small"}>join</Button>
            </CardContent>
        </AnimatedCard>
    )
}