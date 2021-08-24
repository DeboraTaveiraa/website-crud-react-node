import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/admin/dashboard';

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
        <Route path="/" exact component= { Home }></Route>
        <Route path="/produtos/:idProduto" exact component= { ProdutoDetails }></Route>

        // Rota Admin
        <Route path="/admin" exact component= { Dashboard }></Route>

        <Route path="/admin/produtos" exact component= { Produtos }></Route>
        <Route path="/admin/produtos/cadastrar" exact component= { ProdutoCadastrar }></Route>
        <Route path="/admin/produtos/editar/:idProduto" exact component= { ProdutoEditar }></Route>

        <Route path="/admin/usuarios" exact component= { Usuarios }></Route>
        <Route path="/admin/usuarios/cadastrar" exact component= { UsuarioCadastrar }></Route>
        <Route path="/admin/usuarios/editar/:idUsuario" exact component= { UsuarioEditar }></Route>
      </Switch>
    </BrowserRouter>
  )
}