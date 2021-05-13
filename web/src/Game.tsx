import {Socket} from "socket.io-client";
import {FC, useEffect, useRef, useState} from "react";
import styles from './game.module.css';
import {Button, Icon, Typography} from "@material-ui/core";
import {useBoardStore, useIsGameStartedStore, usePlayerStore, useWinnerStore, useXIsNextStore} from "./GameStore";
import {useTransition, animated, useSpring} from "react-spring";
import {TitleAnimation} from "./TitleAnimation";
import {useSocketIdStore} from "./SocketIdStore";

interface Prop{
    socket: Socket
}

export const Game: FC<Prop> = (prop) => {

    const {addPlayer, removePlayer, sortPlayer} = usePlayerStore();
    const {set: setBoard} = useBoardStore();
    const {set: setXIsNext} = useXIsNextStore();
    const {set: setIsGameStarted} = useIsGameStartedStore();
    const {set: setWinner} = useWinnerStore();

    useEffect(() => {

        sortPlayer()

        prop.socket.on('room:user:join', (res: any) => {
            addPlayer(res);
            sortPlayer();
        });

        prop.socket.on('room:user:leave', (id: any) => {
            removePlayer(id);
            sortPlayer();
        });

        prop.socket.on('game:board', (res: any) => {
            setBoard(res);
        })

        prop.socket.on('game:xIsNext', (res: any) => {
            setXIsNext(res);
        })

        prop.socket.on('game:start', (res: any) => {
            setIsGameStarted(true);
        });

        prop.socket.on('game:stop', (res: any) => {
            setIsGameStarted(false);
        });

        prop.socket.on('game:winner', (res: any) => {
            setWinner(res);

            setTimeout(() => {
                setWinner(null);
            }, 5000);
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styles.container}>
            <Title />
            <Board socket={prop.socket}/>
            <Players />
        </div>
    )
}

// @ts-ignore
function Board({socket}){

    let ref = useRef() as any;
    const [wi, setWi] = useState('0px');

    const {board} = useBoardStore();

    useEffect(() => {
        setWi(ref.current.clientWidth + 'px');
    }, [])

    function tileClick(index: number){
        socket.emit('game:move', index)
    }

    return (
        <div
            className={styles.grid}
            ref={ref} style={{height: wi}}>
            {board.map((el, index) => <BoardTile onClick={() => tileClick(index)} key={index} data={el}/>)}
        </div>
    )
}

// @ts-ignore
function BoardTile({data, onClick}){

    const {started} = useIsGameStartedStore();

    return (
        <Button disabled={!started} variant={"outlined"} className={styles.cell} onClick={onClick}> {data} </Button>
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

    const {id} = useSocketIdStore();
    const {xIsNext} = useXIsNextStore();

    function isPlayerTurn(): boolean{
        if(player.role === 'observer') return false;

        if (player.role === 'X' && xIsNext) return false;

        if (player.role === 'O' && !xIsNext) return false;

        return true;
    }

    const animation = useSpring({
       scale: isPlayerTurn() ? 1 : 0,
       opacity: isPlayerTurn() ? 1 : 0,
    });

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
            <span>{player.name} {player.id === id ? ' (you)' : ''}</span>

            <animated.svg style={animation} className={styles.greenDot} height="20" width="20">
                <circle cx="10" cy="10" r="10" fill="#3cd83c" />
            </animated.svg>
        </animated.div>
    )
}

function Title(){

    const {started} = useIsGameStartedStore()
    const {xIsNext} = useXIsNextStore()
    const {winner} = useWinnerStore();

    const [text, changeText] = useState('');

    useEffect(() => {

        function showText(): string{
            if (winner !== null) return 'Winner is ' + winner;

            if (!started) return "Game not started";

            return xIsNext ? "O turn" : "X turn";
        }

        changeText(showText());

    }, [started, xIsNext, winner])

    return (
        <TitleAnimation style={{height: '40px', overflow: 'hidden'}}>
            <Typography variant={"h5"}>
                {text}
            </Typography>
        </TitleAnimation>
    )
}