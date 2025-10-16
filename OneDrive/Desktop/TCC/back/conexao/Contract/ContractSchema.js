import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema({
  aluno: { type: mongoose.Schema.Types.ObjectId, ref: "Aluno", required: true },
  treinador: { type: mongoose.Schema.Types.ObjectId, ref: "Treinador", required: true },
  descricao: { type: String, required: true },
  preco: { type: Number, required: true },
  status: { type: String, enum: ["pendente", "ativo", "cancelado"], default: "pendente" },
  avaliacao: { type: Number, min: 0, max: 5 }
}, { timestamps: true });

export default mongoose.model("Contract", ContractSchema);
