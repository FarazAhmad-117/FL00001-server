const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const db = require('./db');
const {connectDB} = db;
const socketHandler = require('./socket');
const app = express();
const port = process.env.PORT || 3001;
const orderRoutes = require('./routes/order');

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '500mb' }));
app.use(express.static('public'));


// Routers Connected
app.use('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API',
    });
});
app.use('/orders',orderRoutes);


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

socketHandler(io);

connectDB().then(() => {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
