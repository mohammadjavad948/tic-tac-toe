import {Socket} from "socket.io";
import {RoomInterface} from "./roomInterface";
import {generateID} from "./generateId";


export async function registerRoomManager(io, socket: Socket, rooms: Map<string, RoomInterface>){

    // get all rooms
    socket.on('rooms:all', (callback: any) => {
        callback({
            rooms: Array.from(rooms.keys())
        });
    });

    // create new room
    socket.on('room:create', (name: string, callback: any) => {
        // check if room with that name exists return error
        if (rooms.has(name)) {

            return callback({
                ok: false,
                message: `room "${name}" exists`
            })

        }

        // create new room
        const newRoom: RoomInterface = {
            id: generateID(),
            name,
            xIsNext: true,
            start: false,
            players: [{
                id: socket.id,
                // @ts-ignore
                name: socket.name,
                role: generateRole(name)
            }],
            board: new Array(9).fill(null)
        }

        // add it to room array
        rooms.set(name, newRoom);

        // @ts-ignore
        socket.room = name;

        // notify other users
        io.emit('room:new', name);

        socket.join(name);

        // response to user
        callback({
            ok: true,
            room: newRoom
        })
    });

    // join new room
    socket.on('room:join', (name: string, callback: any) => {
        // @ts-ignore
        // check if user have name and room exists
        if(!rooms.has(name) || socket.name === undefined){
            return callback({
                ok: false,
                message: 'invalid data'
            })
        }

        // add user to room list
        const user = {
            id: socket.id,
            // @ts-ignore
            name: socket.name,
            role: generateRole(name)
        }

        rooms.get(name).players.push(user);

        // @ts-ignore
        socket.room = name;

        socket.join(name);

        socket.to(name).emit('room:user:join', user);

        callback({
            ok: true,
            room: rooms.get(name)
        });

        const filter = rooms.get(name).players.filter(e => {
            return e.role === 'X' || e.role === 'O'
        });

        if (filter.length === 2){
            rooms.get(name).start = true;

            io.in(name).emit('game:start')
        }
    });

    socket.on('room:leave', (callback: any) => {
        // @ts-ignore
        if (socket.room === undefined){
            return callback({
                ok: false,
                message: 'you are not in a room'
            });
        }

        // @ts-ignore
        const room = socket.room;

        const userRole = rooms.get(room)
            .players
            .find(e => e.id === socket.id)
            .role

        if (userRole !== 'observer'){
            return callback({
                ok: false,
                message: 'you cant leave'
            });
        }

        const index = rooms.get(room).players.findIndex(e => e.id === socket.id);

        rooms.get(room).players.splice(index, 1);

        socket.to(room).emit('room:user:leave', socket.id);

        callback({
            ok: true
        })
    });

    function generateRole(name: string): 'X' | 'O' | 'observer' {
        if (!rooms.has(name)) {
            return Math.round(Math.random()) ? 'X' : 'O';
        }

        const filter = rooms.get(name).players.filter(e => {
            return e.role === 'X' || e.role === 'O'
        });

        if (filter.length >= 2) return 'observer';

        if (filter.length === 0) return Math.round(Math.random()) ? 'X' : 'O';

        return filter[0].role === 'X' ? 'O' : 'X'
    }

}