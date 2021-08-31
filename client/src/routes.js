import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/admin/dashboard';
import Login from './pages/admin/login';

import PrivateRoute from './services/wAuth';

// Imports Admin
import Produtos from './pages/admin/produtos';
import ProdutoCadastrar from './pages/admin/produtos/produtos.cadastrar';
import ProdutoEditar from './pages/admin/produtos/produtos.editar';

import Usuarios from './pages/admin/usuarios';
import UsuarioCadastrar from './pages/admin/usuarios/usuarios.cadastrar';
import UsuarioEditar from './pages/admin/usuarios/usuarios.editar';

// Imports Client
import Home from './pages/client/home';
import ProdutoDetails from './pages/client/produto/produtos.details';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        // Rota Client
        <Route path="/" exact component= { Home } />
        <Route path="/produtos/:idProduto" exact component= { ProdutoDetails } />

        // Rota Admin
        <Route path="/admin/login" exact component= { Login } />
        <PrivateRoute path="/admin" exact component= { Dashboard } />

        <PrivateRoute path="/admin/produtos" exact component= { Produtos } />
        <PrivateRoute path="/admin/produtos/cadastrar" exact component= { ProdutoCadastrar } />
        <PrivateRoute path="/admin/produtos/editar/:idProduto" exact component= { ProdutoEditar } />

        <PrivateRoute path="/admin/usuarios" exact component= { Usuarios }></PrivateRoute>
        <PrivateRoute path="/admin/usuarios/cadastrar" exact component= { UsuarioCadastrar } />
        <PrivateRoute path="/admin/usuarios/editar/:idUsuario" exact component= { UsuarioEditar } />
      </Switch>
    </BrowserRouter>
  )
}