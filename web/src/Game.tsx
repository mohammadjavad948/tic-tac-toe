import {Socket} from "socket.io-client";
import {FC, useEffect, useRef, useState} from "react";
import style from './game.module.css';
import {Icon, Typography} from "@material-ui/core";
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
        <div style={{width: '100%'}}>
            <Typography variant={"h6"}>
                Players
            </Typography>
            {players.map((e, i) => <PlayerCard player={e} key={i} />)}
        </div>
    )
}

// @ts-ignore
function PlayerCard({player}){

    return (
        <div className={style.playerCard}>
            <span className={style.playerLogo}>
                {
                    player.role !== 'observer' ?
                        player.role :
                        <Icon>
                            visibility
                        </Icon>
                }
            </span>
            <span>{player.name}</span>
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