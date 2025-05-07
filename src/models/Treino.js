import mongoose from 'mongoose';

const treinoExercicioSchema = new mongoose.Schema({
  exercicio: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercicio' },
  series: Number,
  repeticoes: Number,
  descanso: Number
});

const treinoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  data_inicio: Date,
  data_fim: Date,
  id_usu: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  id_treinador: { type: mongoose.Schema.Types.ObjectId, ref: 'Treinador' },
  exercicios: [treinoExercicioSchema],
}, { timestamps: true });

export default mongoose.model('Treino', treinoSchema);