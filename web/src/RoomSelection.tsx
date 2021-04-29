import {Socket} from "socket.io-client";
import {FC, useEffect} from "react";
import style from './roomSelection.module.css';

interface Props{
    socket: Socket
}

export const RoomSelection: FC<Props> = (props) => {

    useEffect(() => {
        props.socket.on('connect', () => {
            props.socket.emit('rooms:all', (res: any) => {
                console.log(res);
            });
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>

        </div>
    )
}