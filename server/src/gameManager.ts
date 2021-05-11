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

       checkBoard();
    }

    // helper functions
    function isPlayerTurn(): boolean{
        // @ts-ignore
        const room = rooms.get(socket.room);

        const player = room.players.find(e => e.id === socket.id);

        return player.role === (room.xIsNext ? 'O' : 'X');
    }

    function changeBoardSquare(index: number): void{
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

    function checkBoard(){
        // @ts-ignore
        const roomName = socket.room;

        if (!rooms.get(roomName).board.includes(null)){

            rooms.get(roomName).board = new Array(9).fill(null);

            io.in(roomName).emit('game:board', rooms.get(roomName).board);
        }
    }

    function calculateWinner(squares: any) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
}
