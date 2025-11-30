import mongoose from "mongoose";

const ExercicioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  details: { type: String, required: true },
  completed: { type: Boolean, default: false },
}, { _id: true });

const TreinoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  day_time: { type: String, required: true },
  week_day: { type: String, required: true },
  exercises: [ExercicioSchema],
  creation_moment: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Aluno", required: true },
});

TreinoSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export default mongoose.model("Treino", TreinoSchema);
