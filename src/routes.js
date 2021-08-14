const express = require('express');
const routes = express.Router();

routes.get('/', function(red, res) {
  res.json({message: 'Hello world'});
});

// exportando funções de rotas
module.exports = routes;