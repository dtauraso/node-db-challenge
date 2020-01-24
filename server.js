const express = require('express');

const ProjectsRouter = require('./projects/project-router.js');

const server = express();

server.use(express.json());
server.use(logger)
server.use('/api/projects', ProjectsRouter);

function logger(req, res, next) {
    const { method, originalUrl } = req
    console.log(`${method} to ${originalUrl}`)
    next()
}
module.exports = server;