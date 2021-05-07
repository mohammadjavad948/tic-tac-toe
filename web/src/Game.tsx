import {Socket} from "socket.io-client";
import {FC, useEffect, useRef, useState} from "react";
import styles from './game.module.css';
import {Icon, Typography} from "@material-ui/core";
import {usePlayerStore} from "./GameStore";
import {useWindowSize} from "./useWindowResize";
import {useSpring, animated} from "react-spring";
import {useDrag} from "react-use-gesture";
import GameFeatures from "./GameFeatures";

interface Prop{
    socket: Socket
}

export const Game: FC<Prop> = (prop) => {

    const {addPlayer, removePlayer} = usePlayerStore();

    const size = useWindowSize();

    useEffect(() => {

        prop.socket.on('room:user:join', (res: any) => {
            addPlayer(res);
        });

        prop.socket.on('room:user:leave', (id: any) => {
            removePlayer(id);
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function showHandle(){
        if (size.width < 800) return <MobilePlayer />
    }

    return (
        <div className={styles.container}>
            <Title />
            <Board />
            {showHandle()}
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

function MobilePlayer(){

    const size = useWindowSize();

    const [animation, api] = useSpring(() => {
        return {
            y: 0
        }
    });

    const bind = useDrag((state) => {
        const {movement: [,oy], down, direction: [, y]} = state;

        const last = animation.y.get();

        api({
            y: oy + last
        });

        if (!down){
            const dir = y > 0 ? -1 : 1;

            if (dir === -1){
                api({
                    y: 0
                })
            }

            if (dir === 1){
                api({
                    y: - (size.height - 30)
                })
            }
        }
    })

    return <animated.div {...bind()} className={styles.mobilePlayer} style={{...animation, top: size.height - 30}}>
        <div className={styles.handle}>
            <Icon>
                expand_less
            </Icon>
        </div>
        <GameFeatures style={{height: size.height - 50}} className={styles.player}/>
    </animated.div>
}

function Title(){

    return (
        <Typography variant={"h5"}>
            Game not started
        </Typography>
    )
}