import {Socket} from "socket.io-client";
import {FC, useEffect} from "react";
import style from './roomSelection.module.css';
import {Button, TextField, Typography} from "@material-ui/core";

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