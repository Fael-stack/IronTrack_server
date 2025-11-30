// back_gui\conexao\Contract\ContractSchema.js
import mongoose from "mongoose";

const PaymentHistorySchema = new mongoose.Schema({
  mp_payment_id: String,
  amount: Number,
  status: String,
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const ContractSchema = new mongoose.Schema({
  aluno: { type: mongoose.Schema.Types.ObjectId, ref: "Aluno", required: true },
  treinador: { type: mongoose.Schema.Types.ObjectId, ref: "Treinador", required: true },
  descricao: { type: String, required: true },
  preco: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ["pendente", "ativo", "cancelado"], default: "pendente" },
  offer: { type: mongoose.Schema.Types.ObjectId, ref: "Offer", default: null },
  mp_subscription_id: { type: String, default: null },
  mp_raw: { type: mongoose.Schema.Types.Mixed, default: null },
  paymentHistory: { type: [PaymentHistorySchema], default: [] }
}, { timestamps: true });

const Contract = mongoose.models.Contract || mongoose.model("Contract", ContractSchema);
export default Contract;
