import {Socket} from "socket.io-client";
import {FC, useEffect, useRef, useState} from "react";
import style from './game.module.css';
import {Typography} from "@material-ui/core";

interface Prop{
    socket: Socket
}

export const Game: FC<Prop> = (prop) => {

    return (
        <div className={style.container}>
            <Title />
            <Board />
        </div>
    )
}

function Board(){

    let ref = useRef() as any;
    const [wi, setWi] = useState('0px');

    useEffect(() => {
        setWi(ref.current.clientWidth + 'px');
    }, [])

    return (
        <div
            className={style.grid}
            ref={ref} style={{height: wi}}>
            <div className={style.cell}> </div>
            <div className={style.cell}> </div>
            <div className={style.cell}> </div>
            <div className={style.cell}> </div>
            <div className={style.cell}> </div>
            <div className={style.cell}> </div>
            <div className={style.cell}> </div>
            <div className={style.cell}> </div>
            <div className={style.cell}> </div>
        </div>
    )
}

function Title(){

    return (
        <Typography variant={"h5"}>
            Game not started
        </Typography>
    )
}