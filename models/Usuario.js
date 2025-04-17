const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, unique: true },
  senha: String,
  objetivo: String,
  altura: Number,
  peso: Number
});

module.exports = mongoose.model('Usuario', UsuarioSchema);