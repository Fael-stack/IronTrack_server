import mongoose from "mongoose";

const TreinadorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dataNascimento: { type: Date, required: true },
  cref: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  isPrivate: { type: Boolean, default: false },

  // Pagamento
  paymentCustomerId: { type: String, required: true }, // obrigatório

  // Relacionamentos
  contracts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contract" }],

  // Avaliações
  avaliacaoMedia: { type: Number, min: 0, max: 5, default: 0 }
}, { timestamps: true });

// Remove campos sensíveis ao retornar JSON
TreinadorSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.hashedPassword;
  return obj;
};

export default mongoose.model("Treinador", TreinadorSchema);
