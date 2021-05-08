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
        const role = rooms.get(socket.room).players.find(e => e.id === socket.id).role;

        // @ts-ignore
        if (rooms.get(socket.room).board[index] !== null){
            return null
        }

        // @ts-ignore
        rooms.get(socket.room).board[index] = role;

        // @ts-ignore
        io.in(socket.room).emit('game:board', rooms.get(socket.room).board);
    }
}
