const Usuario = require('../models/usuario.model');

module.exports = {
  async index(req, res) {
    // retorna todos os usuarios
    const user = await Usuario.find();
    res.json(user);    
  },
  // async: define a função como assíncrona
  async create(req, res) {
    // requisições que chegam do front-end
    const {nome_usuario, email_usuario, tipo_usuario, senha_usuario} = req.body;
    let data = {};

    // verifica se o email inserido no front já existe no banco de dados
    let user = await Usuario.findOne({ email_usuario });

    // caso não exista...
    if (!user) {
      data = {nome_usuario, email_usuario, tipo_usuario, senha_usuario};

      // await: fará com que essa linha só seja executada quando a linha de cima for totalmente executada
      user = await Usuario.create(data);

      // status 200: tudo ok
      return res.status(200).json(user);
    } else {
      // status 500: erro
      return res.status(500).json(user);
    }
  },
  async details(req, res) {
    // retorna detalhes dos usuarios
    const {_id} = req.params;
    const user = await Usuario.findOne({_id});
    res.json(user);    
  },
}