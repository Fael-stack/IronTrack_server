const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required:true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true},
  objetivo: String,
  altura: Number,
  peso: Number,
  imc: Number
},{
  timestamps: true
});

module.exports = mongoose.model('Usuario', UsuarioSchema);