const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['ativo','inativo','finalizado'],
    default: 'ativo'
  },
  criado_em: {
    type: date,
    default: Date.now
  },
    id_usu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    id_treinador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Treinador',
        required: true
    }
  },);

module.exports = mongoose.model('Chat', ChatSchema);