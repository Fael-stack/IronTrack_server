import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  objetivo: String,
  altura: Number,
  peso: Number,
}, { timestamps: true });

export default mongoose.model('Usuario', usuarioSchema);