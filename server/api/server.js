const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

//middleware
const authenticate = require('../auth/authenticate-middleware.js');

//routers
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

//server
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', logger, authRouter);
server.use('/api/jokes',  authenticate, jokesRouter);

//sanity check route
server.get('/', logger, (req, res) => {
    res.status(200).json({ api: "online" });
})

module.exports = server;


function logger(req, res, next) {
    console.log(
        `[${new Date().toISOString()}] 
            \n ${req.method} to ${req.url} from ${req.get('Origin')}`, {reqBody: req.body, reqHeaders: req.headers, resBody: res.body, resHeaders: res.headers} 
            
    );

    next();
}