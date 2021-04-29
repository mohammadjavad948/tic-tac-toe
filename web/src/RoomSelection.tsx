import {Socket} from "socket.io-client";
import {FC, useEffect} from "react";
import style from './roomSelection.module.css';
import {Button, Card, CardContent, TextField, Typography, useTheme} from "@material-ui/core";

interface Props{
    socket: Socket
}

export const RoomSelection: FC<Props> = (props) => {

    useEffect(() => {
        props.socket.on('connect', () => {
            props.socket.emit('rooms:all', (res: any) => {
                console.log(res);
            });
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={style.container}>
           <NewRoom />
           <Typography style={{marginTop: '30px'}} variant={"h5"}>Rooms</Typography>
           <div className={style.roomsContainer}>
               <RoomCard name={"ali"}/>
               <RoomCard name={"asghar"}/>
               <RoomCard name={"ahmad"}/>
               <RoomCard name={"mamad"}/>
               <RoomCard name={"fateme"}/>
               <RoomCard name={"shahab"}/>
               <RoomCard name={"ghazal"}/>
               <RoomCard name={"test1"}/>
           </div>
        </div>
    )
}

function NewRoom(){

    return (
        <div>
            <Typography variant={'h5'}>New Room</Typography>
            <div className={style.form}>
                <TextField label={"name"} variant={"outlined"}/>
                <Button variant={"contained"} color={"primary"}>create</Button>
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