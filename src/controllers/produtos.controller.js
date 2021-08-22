const Produto = require('../models/produto.model');

module.exports = {
  async index(req, res) {
    // retorna todos os produtos
    const product = await Produto.find();
    res.json(product);    
  },
  // async: define a função como assíncrona
  async create(req, res) {
    // requisições que chegam do front-end
    const {nome_produto, descricao_produto, preco_produto, qtd_produto} = req.body;
    let data = {};
    
    let product = await Produto.findOne({ nome_produto });

    // caso não exista...
    if (!product) {
      data = {nome_produto, descricao_produto, preco_produto, qtd_produto};

      // await: fará com que essa linha só seja executada quando a linha de cima for totalmente executada
      product = await Produto.create(data);

      // status 200: tudo ok
      return res.status(200).json(product);
    } else {
      // status 500: erro
      return res.status(500).json(product);
    }
  },
  async details(req, res) {    
    const {_id} = req.params;
    const product = await Produto.findOne({_id});
    res.json(product);    
  },
  async delete(req, res) {
    // {_id}: forma de desistruturar os dados
    const {_id} = req.params;
    const product = await Produto.findByIdAndDelete({_id});
    return res.json(product);
  },
  async update(req, res) {
    const {_id, nome_produto, descricao_produto, preco_produto, qtd_produto} = req.body;
    const data = {nome_produto, descricao_produto, preco_produto, qtd_produto};
    const product = await Produto.findOneAndUpdate({_id}, data, {new: true}); //new: true - é o parâmetro que faz com que se entenda que esses dados serão atualizados.
    res.json(product);
  }
}