import {Socket} from "socket.io";
import {RoomInterface} from "./roomInterface";

export async function registerConnectionManager(io, socket: Socket, rooms: Map<string, RoomInterface>){

    socket.on('disconnect', (reason: string) => {
        // @ts-ignore
        const room = socket.room;

        if (room === undefined) return null;

        const Aroom = rooms.get(room);

        if (Aroom.players.length === 1){
            rooms.delete(room);

            io.emit('room:delete', room);

            return null;
        }

        const index = Aroom.players.findIndex(e => e.id === socket.id);
        rooms.get(room).players.splice(index, 1);

        socket.to(room).emit('room:user:leave', socket.id);
    });

    socket.on('register:name', (name: string, callback: any) => {
        // @ts-ignore
        socket.name = name;

        callback({
            done: true
        })
    });
}