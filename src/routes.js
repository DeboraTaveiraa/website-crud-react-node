const express = require('express');
const routes = express.Router();
const Usuario = require('./controllers/usuarios.controller');

routes.get('/', Usuario.index);

// ROTAS DE USUÁRIOS
routes.post('/api/usuarios' ,Usuario.create);
routes.get('/api/usuarios', Usuario.index);
routes.get('/api/usuarios-details/:_id', Usuario.details);

// exportando funções de rotas
module.exports = routes;