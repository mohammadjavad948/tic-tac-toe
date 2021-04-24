import {Socket} from "socket.io";
import {RoomInterface} from "./roomInterface";


export async function registerRoomManager(io, socket: Socket, rooms: Map<string, RoomInterface>){

    socket.on('rooms:all', (callback: any) => {
        callback({
            rooms: rooms.values()
        });
    })

}