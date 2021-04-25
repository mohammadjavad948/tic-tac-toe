import * as express from 'express';
import {Socket} from "socket.io";
import {RoomInterface} from "./roomInterface";
import {registerConnectionManager} from "./connectionManager";
import {registerRoomManager} from "./roomManager";
const socketIO = require('socket.io');

const app = express();

const server = app.listen(process.env.PORT || 4000, () => {
    console.log('server is running');
});

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let rooms = new Map<string, RoomInterface>();

io.on('connection', (socket: Socket) => {
    registerConnectionManager(io, socket, rooms);
    registerRoomManager(io, socket, rooms);
});
