// express server setup
const express = require('express');
const server = express();

// imports
const helmet = require('helmet');
const cors = require('cors');
const userRouter = require('./users/users-router');


// server.use()
server.use(helmet())
server.use(cors())
server.use(express.json())

// server router
server.use('/api', userRouter);



module.exports = server;