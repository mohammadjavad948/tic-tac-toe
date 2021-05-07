import {Socket} from "socket.io";
import {RoomInterface} from "./roomInterface";


export async function registerGameManager(io, socket: Socket, rooms: Map<string, RoomInterface>){
    // register events
    socket.on('game:move', move);
    // socket.on('game:reaction');

    // event functions
    function move(block: number){
        const playerTurn = isPlayerTurn();

        if(!playerTurn) return null;

        // @ts-ignore
        const room = rooms.get(socket.room);
    }

    // helper functions
    function isPlayerTurn(): boolean{
        // @ts-ignore
        const room = rooms.get(socket.room);

        const player = room.players.find(e => e.id === socket.id);

        return player.role === (room.xIsNext ? 'O' : 'X');
    }
}
