const express = require('express');

// const RecipiesRouter = require('./recipies/recipie-router.js');

const server = express();

server.use(express.json());
server.use(logger)
// server.use('/api/recipies', RecipiesRouter);

function logger(req, res, next) {
    const { method, originalUrl } = req
    console.log(`${method} to ${originalUrl}`)
    next()
}
module.exports = server;