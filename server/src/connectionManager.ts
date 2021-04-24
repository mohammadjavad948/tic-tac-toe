import {Socket} from "socket.io";
import {RoomInterface} from "./roomInterface";

export async function registerConnectionManager(io, socket: Socket, room: Map<string, RoomInterface>){

    socket.on('disconnect', () => {

    });

    socket.on('register:name', (name: string, callback: any) => {

    });
}