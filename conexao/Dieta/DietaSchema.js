import mongoose from "mongoose";

const DietaSchema = new mongoose.Schema({
  name: String,
  day_time: String,
  week_day: String,
  macronutrients: [String],
  kcal: Number,
  ingredients: [String],
  creation_moment: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Aluno", required: true },
});

export default mongoose.model("Dieta", DietaSchema);