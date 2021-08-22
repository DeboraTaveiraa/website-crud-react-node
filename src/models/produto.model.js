const mongoose = require('mongoose');

// definição de todos os campos dessa collection/tabela
const DataSchema = new mongoose.Schema({
  nome_produto: String,
  descricao_produto: String,
  preco_produto: Number,
  qtd_produto: { type: Number, default: 0 },
}, {
  // seria o mesmo que criar os campos: createdAt e updatedAt
  timestamps: true
});


const produtos = mongoose.model('Produtos', DataSchema);
module.exports = produtos;