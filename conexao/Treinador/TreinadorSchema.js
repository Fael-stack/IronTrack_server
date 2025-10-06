import mongoose from "mongoose";

const TreinadorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  certification: String, // CREF
  password: String,
  email: { type: String, unique: true },
  creation_moment: { type: Date, default: Date.now },
  phone: { type: String }, // Removido unique aqui
  private: { type: Boolean, default: false },
  contracts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contrato" }],
  payment_info: {
    card_number: String,
    card_expiry: String,
    card_cvv: String
  }
});

// Cria índice único somente se o campo phone existir
TreinadorSchema.index({ phone: 1 }, { unique: true, sparse: true });

export default mongoose.model("Treinador", TreinadorSchema);
