import * as express from 'express';
import {Socket} from "socket.io";
import {RoomInterface} from "./roomInterface";
import {registerConnectionManager} from "./connectionManager";
import {registerRoomManager} from "./roomManager";
const socketIO = require('socket.io');
import * as cors from 'cors';
import {registerGameManager} from "./gameManager";

const app = express();

app.use(cors())
app.options('*', cors())

app.get('/', (req, res) => {
    res.send('hello')
})

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
    // ping function
    socket.on("ping", (cb) => {
        if (typeof cb === "function")
            cb();
    });
    registerConnectionManager(io, socket, rooms);
    registerRoomManager(io, socket, rooms);
    registerGameManager(io, socket, rooms);
});
