import style from './container.module.css';
import {AskName} from "./AskName";
import {useNameStore} from "./nameStore";
import {RoomSelection} from "./RoomSelection";
import {useEffect} from "react";
import {io} from "socket.io-client";
import {Logger} from "./logger";
import {useGameStore} from "./GameStore";
import {Game} from "./Game";
import {Connection} from "./Connection";
import {useConnectionStore} from "./ConnectionStore";
import GameFeatures from "./GameFeatures";

const socket = io('https://rocky-taiga-45985.herokuapp.com/');

export default function Container(){

    const {name} = useNameStore();
    const {inRoom} = useGameStore();
    const {up, down, changeMessage} = useConnectionStore();

    useEffect(() => {

        socket.on('connect', () => {
            Logger.info('ws', 'connected to server')
            Logger.info('ws', `id: ${socket.id}`);

            changeMessage('connected');
            down();

            socket.onAny(console.log);

            if (name !== ''){
                socket.emit('register:name', name, (res: any) => {
                    if (res.done){
                        Logger.info('ws', 'user registered');
                    }
                })
            }
        });

        socket.on('disconnect', () => {
            Logger.danger('ws', 'websocket disconnected');

            changeMessage('disconnected');
            up();
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    function showComponent(){
        if (name === ''){
            return <AskName socket={socket}/>
        }

        if (inRoom){
            return <Game socket={socket}/>
        }

        return <RoomSelection socket={socket}/>
    }

    function showSide(){
        if (inRoom) return <GameFeatures className={style.container}/>
    }

    return (
        <div className={style.base}>
            <div className={style.container}>
                {showComponent()}
                <Connection />
            </div>
            {showSide()}
        </div>
    )
}