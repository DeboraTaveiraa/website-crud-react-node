const mongoose = require('mongoose');

// definição de todos os campos dessa collection/tabela
const DataSchema = new mongoose.Schema({
  nome_usuario: String,
  email_usuario: String,
  tipo_usuario: { type: Number, default: 1 },
  senha_usuario: String,
})