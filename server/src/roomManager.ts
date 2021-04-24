import {Socket} from "socket.io";
import {RoomInterface} from "./roomInterface";
import {generateID} from "./generateId";


export async function registerRoomManager(io, socket: Socket, rooms: Map<string, RoomInterface>){

    // get all rooms
    socket.on('rooms:all', (callback: any) => {
        callback({
            rooms: rooms.values()
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
                role: 'X'
            }],
            board: new Array(9).fill(null)
        }

        // add it to room array
        rooms.set(name, newRoom);

        // notify other users
        io.emit('room:new', name);

        // response to user
        callback({
            ok: true,
            room: newRoom
        })
    });

    // join new room
    socket.on('room:join', (name: string, callback: any) => {

    })

}