const mongoose = require('mongoose');

const ExercicioSchema = new mongoose.Schema({
    nome: String,
    tipo: String,
    descricao: String
  });
  

module.exports = mongoose.model('Exercicios', ExerciciosSchema);