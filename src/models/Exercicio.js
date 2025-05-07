import mongoose from 'mongoose';

const exercicioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tipo: String,
  descricao: String,
}, { timestamps: true });

export default mongoose.model('Exercicio', exercicioSchema);
