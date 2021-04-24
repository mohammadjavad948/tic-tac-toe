import express from 'express';
const socketIO = require('socket.io');

const app = express();

const server = app.listen(process.env || 3000, () => {
    console.log('server is running');
});

const io = socketIO(server);
