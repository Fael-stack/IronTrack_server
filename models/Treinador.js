import mongoose from 'mongoose';

const treinadorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  especialidade: String,
  descricao: String,
  avaliacao: Number,
  id_usu: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
}, { timestamps: true });

export default mongoose.model('Treinador', treinadorSchema);
