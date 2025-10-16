import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  contract: { type: mongoose.Schema.Types.ObjectId, ref: "Contract", required: true },
  mensagens: [
    {
      remetente: { type: mongoose.Schema.Types.ObjectId, refPath: "mensagens.remetenteModel" },
      remetenteModel: { type: String, enum: ["Aluno", "Treinador"], required: true },
      conteudo: { type: String, required: true },
      data: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

export default mongoose.model("Chat", ChatSchema);
