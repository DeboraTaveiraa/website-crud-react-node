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
  async delete(req, res) {
    // {_id}: forma de desistruturar os dados
    const {_id} = req.params;
    const user = await Usuario.findByIdAndDelete({_id});
    return res.json(user);
  },
  async update(req, res) {
    const {_id, nome_usuario, email_usuario, senha_usuario, tipo_usuario} = req.body;
    const data = {nome_usuario, email_usuario, senha_usuario, tipo_usuario};
    const user = await Usuario.findOneAndUpdate({_id}, data, {new: true}); //new: true - é o parâmetro que faz com que se entenda que esses dados serão atualizados.
    res.json(user);
  }
}