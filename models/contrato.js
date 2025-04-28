const mongoose = require('mongoose');

const ContratoSchema = new mongoose.Schema({
    valor: Number,
    data_inicio: Date,
    data_fim: Date,
    status: String,
    id_usu: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    id_treinador: { type: mongoose.Schema.Types.ObjectId, ref: 'Treinador' }
  });
  

module.exports = mongoose.model('Contrato', ContratoSchema);