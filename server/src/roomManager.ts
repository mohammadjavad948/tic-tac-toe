import {Socket} from "socket.io";
import {RoomInterface} from "./roomInterface";


export async function registerRoomManager(io, socket: Socket, rooms: Map<string, RoomInterface>){

    socket.on('rooms:all', (callback: any) => {
        callback({
            rooms: rooms.values()
        });
    });

    socket.on('room:create', (name: string, callback: any) => {
        if (rooms.has(name)) {

            return callback({
                ok: false,
                message: `room "${name}" exists`
            })

        }
    })

}