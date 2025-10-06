import mongoose from "mongoose";

const AlunoSchema = new mongoose.Schema({
  name: String,
  age: Number,
  imc: Number,
  password: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  weight: Number,
  height: Number,
  creation_moment: { type: Date, default: Date.now },
  private: { type: Boolean, default: false }, // se o perfil é privado
  contracts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contrato" }]
});

export default mongoose.model("Aluno", AlunoSchema);