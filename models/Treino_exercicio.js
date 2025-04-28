const mongoose = require('mongoose');

const TreinoExercicioSchema = new mongoose.Schema({
    id_treino: { type: mongoose.Schema.Types.ObjectId, ref: 'Treino' },
    id_exercicio: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercicio' },
    series: Number,
    repeticoes: Number,
    descanso: Number
  });
  
 module.exports = mongoose.model('Treinador', TreinadorSchema); 