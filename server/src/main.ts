import express from 'express';

const app = express();

const server = app.listen(process.env || 3000, () => {
    console.log('server is running');
});
