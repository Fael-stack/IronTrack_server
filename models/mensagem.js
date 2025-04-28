const mongoose = require('mongoose');

const MensagemSchema = new mongoose.Schema({
    remetente: String, 
    conteudo: String,
    enviado_em: Date,
    lida: Boolean,
    id_chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }
  });

module.exports = mongoose.model('Mensagem', MensagemSchema);