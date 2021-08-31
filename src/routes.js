const express = require('express');
const routes = express.Router();

const Usuario = require('./controllers/usuarios.controller');
const Produto = require('./controllers/produtos.controller');


// ROTAS DE USUÁRIOS
routes.post('/api/usuarios' ,Usuario.create); // cadastra um novo usuário
routes.get('/api/usuarios', Usuario.index); // retorna todos os usários cadastrados
routes.get('/api/usuarios-details/:_id', Usuario.details); // retorna determinado usuário pelo id
routes.delete('/api/usuarios/:_id', Usuario.delete); // deleta determinado usuário pelo id
routes.put('/api/usuarios', Usuario.update); // atualizada os dados de determinado usuário
routes.post('/api/usuarios/login', Usuario.login);
routes.get('/api/usuarios/checktoken', Usuario.checkToken);


// ROTAS DE PRODUTOS
routes.post('/api/produtos', Produto.create);
routes.get('/api/produtos', Produto.index);
routes.get('/api/produtos-details/:_id', Produto.details);
routes.delete('/api/produtos/:_id', Produto.delete);
routes.put('/api/produtos', Produto.update);

// exportando funções de rotas
module.exports = routes;