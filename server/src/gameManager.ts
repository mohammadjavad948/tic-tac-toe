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

       changeBoardSquare(block);
    }

    // helper functions
    function isPlayerTurn(): boolean{
        // @ts-ignore
        const room = rooms.get(socket.room);

        const player = room.players.find(e => e.id === socket.id);

        return player.role === (room.xIsNext ? 'O' : 'X');
    }

    function changeBoardSquare(index: number){
        // @ts-ignore
        const roomName = socket.room

        const role = rooms.get(roomName).players.find(e => e.id === socket.id).role;

        if (rooms.get(roomName).board[index] !== null){
            return null
        }

        rooms.get(roomName).board[index] = role;

        io.in(roomName).emit('game:board', rooms.get(roomName).board);

        rooms.get(roomName).xIsNext = !rooms.get(roomName).xIsNext;

        io.in(roomName).emit('game:xIsNext', rooms.get(roomName).xIsNext);
    }
}
