const Usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');
const secret = "mysecret";

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
  },
  async login(req,res){
    const { email, senha } = req.body;
    Usuario.findOne({email_usuario: email}, function(err,user){
        if(err){
            console.log(err);
            res.status(200).json({erro: "Erro no servidor. Por favor, tente novamente"});
        }else if (!user){
            res.status(200).json({status:2, error: 'E-mail não encontrado no banco de dados'});
        }else{
            user.isCorrectPassword(senha, async function (err, same){
                if(err){
                    res.status(200).json({error: "Erro no servidor. Por favor, tente novamente"});
                }else if(!same){
                    res.status(200).json({status:2, error: "A senha não confere"});
                }else{
                    const payload = { email };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '24h'
                    })
                    res.cookie('token', token, {httpOnly: true});
                    res.status(200).json({status:1, auth:true, token:token,id_client: user._id,user_name:user.nome_usuario,user_type:user.tipo_usuario});
                }
            })
           
        }
    })
  },
  async checkToken(req, res) {
    const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];    

    if(!token) {
      res.json({ status: 401, msg: 'Não autorizado: Token inexistente.'});
    } else {
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          res.json({ status: 401, msg: 'Não autorizado: Token inválido.'});
        } else {          
          res.json({ status: 200 })
        }
      })
    }
  }
}