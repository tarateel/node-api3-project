// library
const express = require('express');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const validateUser = require('./middleware/validateUser');
const validateUserId = require('./middleware/validateUser');
const validatePost = require('./middleware/validatePost');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const welcomeRouter = require('./welcome/welcomeRouter');

// global object
const server = express();

// 3rd-party middleware from npm
server.use(helmet());

//custom middleware
server.use(logger());
server.use(validateUser());
server.use


module.exports = server;
