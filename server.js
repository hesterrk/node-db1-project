const express = require('express');

const AcountsRouter = require('./accounts-router');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use('/api/accounts', AcountsRouter);

server.get('/', (req, res) => {
    res.send('<h3>My Knex Project</h3>');
  });

  server.use((err, req, res, next) => {
    res.status(500).json({
      message: "Something went wrong"
    });
  });

  server.use((req, res) => {
    res.status(404).json({
      message: "Your request is not found"
    });
  });


module.exports = server;