const mongoose = require('mongoose');

const AlimentoSchema = new mongoose.Schema({
  nome: {type: String, require: true},
  calorias_alimento: {type: String, require: true},
  proterinas_alimento: {type: Number, require: true},
  gordura_alimento: {type: Number, require: true}
});

module.exports = mongoose.model('Alimento', AlimentoSchema);