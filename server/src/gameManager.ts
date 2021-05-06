import {Socket} from "socket.io";
import {RoomInterface} from "./roomInterface";


export async function registerGameManager(io, socket: Socket, rooms: Map<string, RoomInterface>){
    // register events
    socket.on('game:move', move);
    // socket.on('game:reaction');

    // event functions
    function move(block: number){

    }
}
