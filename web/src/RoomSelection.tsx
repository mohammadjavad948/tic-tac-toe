import {Socket} from "socket.io-client";
import {FC, useEffect, useState} from "react";
import style from './roomSelection.module.css';
import {Button, Card, CardContent, TextField, Typography, useTheme} from "@material-ui/core";

interface Props{
    socket: Socket
}

export const RoomSelection: FC<Props> = (props) => {

    const [rooms, setRooms] = useState<string[]>([]);

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
            console.log(res)
        })
    }

    return (
        <div className={style.container}>
           <NewRoom create={create}/>
           <Typography style={{marginTop: '30px'}} variant={"h5"}>Rooms</Typography>
           <div className={style.roomsContainer}>
               {
                   rooms.map((e: any, index) => <RoomCard key={index} name={e}/>)
               }
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
function RoomCard({name}){

    const theme = useTheme();

    return (
        <Card variant={"outlined"} style={{background: theme.palette.background.default}} className={style.roomCard}>
            <CardContent className={style.cardContainer}>
                <Typography variant={"body1"}>{name}</Typography>
                <Button variant={"outlined"} size={"small"}>join</Button>
            </CardContent>
        </Card>
    )
}