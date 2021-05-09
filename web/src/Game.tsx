import {Socket} from "socket.io-client";
import {FC, useEffect, useRef, useState} from "react";
import styles from './game.module.css';
import {Icon, Typography} from "@material-ui/core";
import {useBoardStore, usePlayerStore} from "./GameStore";
import {useTransition, animated} from "react-spring";

interface Prop{
    socket: Socket
}

export const Game: FC<Prop> = (prop) => {

    const {addPlayer, removePlayer} = usePlayerStore();
    const {set: setBoard} = useBoardStore();

    useEffect(() => {

        prop.socket.on('room:user:join', (res: any) => {
            addPlayer(res);
        });

        prop.socket.on('room:user:leave', (id: any) => {
            removePlayer(id);
        });

        prop.socket.on('game:board', (res: any) => {
            setBoard(res);
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styles.container}>
            <Title />
            <Board />
            <Players />
        </div>
    )
}

function Board(){

    let ref = useRef() as any;
    const [wi, setWi] = useState('0px');

    const {board} = useBoardStore();

    useEffect(() => {
        setWi(ref.current.clientWidth + 'px');
    }, [])

    return (
        <div
            className={styles.grid}
            ref={ref} style={{height: wi}}>
            {board.map((el, index) => <BoardTile key={index} data={el}/>)}
        </div>
    )
}

// @ts-ignore
function BoardTile({data}){
    return (
        <div className={styles.cell}> </div>
    )
}

function Players(){

    const {players} = usePlayerStore();

    const transition = useTransition(
        players,
        {
            from: (item, index) => {
                return { y: index * 60, opacity: 0 }
            },
            leave: (item, index) => {
                return { y: index * 60, opacity: 0 }
            },
            enter: (item, index) => {
                return { y: index * 70, opacity: 1 }
            },
            update: (item, index) => {
                return { y: index * 70 }
            },
        }
    );

    return (
        <div style={{width: '100%', position: 'relative'}}>
            <Typography variant={"h6"}>
                Players
            </Typography>
            {transition((style, item) => (
                <PlayerCard player={item} style={style}/>
            ))}
        </div>
    )
}

// @ts-ignore
function PlayerCard({player, style}){

    return (
        <animated.div className={styles.playerCard} style={{top: style.y.to((x: any) => (x + 28) + 'px'), opacity: style.opacity}}>
            <span className={styles.playerLogo}>
                {
                    player.role !== 'observer' ?
                        player.role :
                        <Icon>
                            visibility
                        </Icon>
                }
            </span>
            <span>{player.name}</span>
        </animated.div>
    )
}

function Title(){

    return (
        <Typography variant={"h5"}>
            Game not started
        </Typography>
    )
}