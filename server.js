// library
const express = require('express');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const userRouter = require('./users/userRouter');
// const postRouter = require('./posts/postRouter');
const welcomeRouter = require('./welcome/welcomeRouter');

// global object
const server = express();

// 3rd-party middleware from npm
server.use(helmet());

//custom middleware
server.use(logger());
server.use(validateUser());
server.use(validateUserId());
server.use(validatePost());

server.use(express.json());
server.use("/", welcomeRouter);
server.use("/api/users', userRouter")

server.get('/api/users', (req, res) => {
  res.send(`
  <h2>User Posts</h2>`)
});

module.exports = server;
