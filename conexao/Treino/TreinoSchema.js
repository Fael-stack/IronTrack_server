import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  details: { type: String, required: true },
  completed: { type: Boolean, default: false },
}, { _id: true }); // Cada exercício terá seu próprio _id automático

const TreinoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  day_time: { type: String, required: true }, // manhã/tarde/noite
  week_day: { type: String, required: true }, // segunda, terça...
  exercises: [ExerciseSchema],
  creation_moment: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Aluno", required: true },
});

// Método opcional para retornar treino limpo (sem campos internos desnecessários)
TreinoSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export default mongoose.model("Treino", TreinoSchema);
