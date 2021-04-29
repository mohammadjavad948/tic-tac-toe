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

const socket = io('https://secret-fortress-87428.herokuapp.com/');

export default function Container(){

    const {name} = useNameStore();
    const {inRoom} = useGameStore();

    useEffect(() => {

        socket.on('connect', () => {
            Logger.info('ws', 'connected to server')
            Logger.info('ws', `id: ${socket.id}`);

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

    return (
        <div className={style.container}>
            {showComponent()}
            <Connection />
        </div>
    )
}