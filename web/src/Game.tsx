import {Socket} from "socket.io-client";
import {FC, useEffect, useRef, useState} from "react";
import styles from './game.module.css';
import {Typography} from "@material-ui/core";
import {usePlayerStore} from "./GameStore";

interface Prop{
    socket: Socket
}

export const Game: FC<Prop> = (prop) => {

    const {addPlayer, removePlayer} = usePlayerStore();

    useEffect(() => {

        prop.socket.on('room:user:join', (res: any) => {
            addPlayer(res);
        });

        prop.socket.on('room:user:leave', (id: any) => {
            removePlayer(id);
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styles.container}>
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
            className={styles.grid}
            ref={ref} style={{height: wi}}>
            <div className={styles.cell}> </div>
            <div className={styles.cell}> </div>
            <div className={styles.cell}> </div>
            <div className={styles.cell}> </div>
            <div className={styles.cell}> </div>
            <div className={styles.cell}> </div>
            <div className={styles.cell}> </div>
            <div className={styles.cell}> </div>
            <div className={styles.cell}> </div>
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