// back_gui\conexao\OfferOfferSchema.js
import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema({
  treinador: { type: mongoose.Schema.Types.ObjectId, ref: "Treinador", required: true },
  titulo: { type: String, default: "Mentoria" },
  descricao: { type: String, required: true },
  diasDisponiveis: [{ type: String, enum: ["domingo","segunda","terca","quarta","quinta","sexta","sabado"] }],
  precoSemanal: { type: Number, required: true, min: 0 },
  ativo: { type: Boolean, default: true }
}, { timestamps: true });

const Offer = mongoose.models.Offer || mongoose.model("Offer", OfferSchema);
export default Offer;
