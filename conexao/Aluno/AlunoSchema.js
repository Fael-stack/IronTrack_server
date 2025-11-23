import mongoose from "mongoose";

const AlunoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    birthDate: { type: Date, required: true }, // substitui age
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    phone: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    paymentCustomerId: { type: String, required: true }, // ID do cliente/cartão

    isPrivate: { type: Boolean, default: false },

    
    contracts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contract" }],
    workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Treino" }],
    diets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dieta" }],
  },
  { timestamps: true }
);

// índice esparso para telefone (opcional)
AlunoSchema.index({ phone: 1 }, { sparse: true });


AlunoSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.hashedPassword;
  return obj;
};

export default mongoose.model("Aluno", AlunoSchema);
