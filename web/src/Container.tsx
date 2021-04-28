import style from './container.module.css';
import AskName from "./AskName";
import {useNameStore} from "./nameStore";
import RoomSelection from "./RoomSelection";
import {useEffect} from "react";
import {io} from "socket.io-client";

const socket = io('https://secret-fortress-87428.herokuapp.com/');

export default function Container(){

    const {name} = useNameStore()

    useEffect(() => {

        socket.on('connect', () => {
            console.log(socket.id)
        })

    }, [])


    function showComponent(){
        if (name === ''){
            return <AskName />
        }

        return <RoomSelection />
    }

    return (
        <div className={style.container}>
            {showComponent()}
        </div>
    )
}