const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();

const usersRouter = require('./users/users-router');
const plantsRouter = require('./plants/plants-router');

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/users', usersRouter);
server.use('/api/plants', plantsRouter);

// Error handling
server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server
 