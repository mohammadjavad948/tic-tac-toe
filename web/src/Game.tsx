import {Socket} from "socket.io-client";
import {FC, useEffect, useRef, useState} from "react";
import style from './game.module.css';
import {Typography} from "@material-ui/core";
import {usePlayerStore} from "./GameStore";

interface Prop{
    socket: Socket
}

export const Game: FC<Prop> = (prop) => {

    const {addPlayer} = usePlayerStore();

    useEffect(() => {

        prop.socket.on('room:user:join', (res: any) => {
            addPlayer(res);
        })

    }, [])

    return (
        <div className={style.container}>
            <Title />
            <Board />
            <Players />
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

function Players(){

    const {players} = usePlayerStore();

    return (
        <div>
            {players.map((e, i) => <span key={i}>{e.name}</span>)}
        </div>
    )
}

function PlayerCard(player: {name: string, id: string, role: "X" | "O" | "observer"}){

    return (
        <div style={{width: '100%', display: 'flex'}}>

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