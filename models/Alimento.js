import mongoose from 'mongoose';

const alimentoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  calorias_alimento: Number,
  proteinas_alimento: Number,
  carboidratos_alimento: Number,
  gorduras_alimento: Number
}, { timestamps: true });

export default mongoose.model('Alimento', alimentoSchema);