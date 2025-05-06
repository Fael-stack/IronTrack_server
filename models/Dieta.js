import mongoose from 'mongoose';

const dietaAlimentoSchema = new mongoose.Schema({
  alimento: { type: mongoose.Schema.Types.ObjectId, ref: 'Alimento' },
  quantidade: Number,
  refeicao: String,
  horario: String
});

const dietaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  data_inicio: Date,
  descricao: String,
  calorias_totais: Number,
  proteinas_totais: Number,
  carbo_totais: Number,
  gorduras_totais: Number,
  id_usu: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  id_treinador: { type: mongoose.Schema.Types.ObjectId, ref: 'Treinador' },
  alimentos: [dietaAlimentoSchema]
}, { timestamps: true });

export default mongoose.model('Dieta', dietaSchema);