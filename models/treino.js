const mongoose = require('mongoose');

const TreinoSchema = new mongoose.Schema({
    nome: String,
    data_inicio: Date,
    data_fim: Date,
    id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    id_treinador: { type: mongoose.Schema.Types.ObjectId, ref: 'Treinador' }
  });
  

module.exports = mongoose.model('Treino', TreinoSchema);