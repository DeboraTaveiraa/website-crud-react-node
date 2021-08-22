const mongoose = require('mongoose');
// configuração para criptografar a senha do usuário
const bcrypt = require('bcrypt');

// definição de todos os campos dessa collection/tabela
const DataSchema = new mongoose.Schema({
  nome_usuario: String,
  email_usuario: String,
  tipo_usuario: { type: Number, default: 1 },
  senha_usuario: String,
}, {
  // seria o mesmo que criar os campos: createdAt e updatedAt
  timestamps: true
});

// antes de salvar os dados, essa função irá criptografar a senha 
DataSchema.pre('save', function(next) {
  if (!this.isModified('senha_usuario')) {
    return next();
  }
  this.senha_usuario = bcrypt.hashSync(this.senha_usuario, 10);
  next();
});

DataSchema.pre('findOneAndUpdate', function(next) {
  var password = this.getUpdate().senha_usuario+''; // as '' é para tornar a senha como string
  if (password.length < 55) {
    this.getUpdate().senha_usuario = bcrypt.hashSync(password, 10);
  }
  next();
})

const usuarios = mongoose.model('Usuarios', DataSchema);
module.exports = usuarios;