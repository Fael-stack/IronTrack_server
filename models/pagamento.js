const mongoose = require('mongoose');

const PagamentoSchema = new mongoose.Schema({
    valor: Number,
    date: Date,
    metodo: String,
    status: String,
    id_usu: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    id_treinador: { type: mongoose.Schema.Types.ObjectId, ref: 'Treinador' }
  });
  

module.exports = mongoose.model('Pagamento', PagamentoSchema);