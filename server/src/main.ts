import express from 'express';
import {Socket} from "socket.io";
const socketIO = require('socket.io');

const app = express();

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('server is running');
});

const io = socketIO(server);

let rooms = new Map<string, any>();

io.on('connection', (socket: Socket) => {

});