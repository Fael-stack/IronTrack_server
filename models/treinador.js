const mongoose = require('mongoose');

const TreinadorSchema = new mongoose.Schema({
        nome: String,
        especialidade: String,
        descricao: String,
        avaliacao: Number,
        id_usu: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
      });
      
;

module.exports = mongoose.model('Treinador', TreinadorSchema);