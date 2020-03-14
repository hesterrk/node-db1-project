const express = require('express');

const AcountsRouter = require('./accounts-router');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use('/api/accounts', AcountsRouter);

server.get('/', (req, res) => {
    res.send('<h3>My Knex Project</h3>');
  });


module.exports = server;