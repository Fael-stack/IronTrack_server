const mongoose = require('mongoose');

const DietaAlimentoSchema = new mongoose.Schema({
    id_dieta: { type: mongoose.Schema.Types.ObjectId, ref: 'Dieta' },
    id_alimento: { type: mongoose.Schema.Types.ObjectId, ref: 'Alimento' },
    quantidade: Number,
    refeicao: String,
    horario: String
  });
  

module.exports = mongoose.model('dietaAlimento', dietaAlimentoSchema);