import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema({
  treinador: { type: mongoose.Schema.Types.ObjectId, ref: "Treinador", required: true },
  aluno: { type: mongoose.Schema.Types.ObjectId, ref: "Aluno", required: true },
  description: { type: String, default: "" },
  price: { type: Number, default: 0 },
  status: { type: String, enum: ["pendente", "ativo", "finalizado"], default: "pendente" }
});

export default mongoose.model("Contract", ContractSchema);
