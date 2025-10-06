import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, refPath: "senderModel" }, 
  senderModel: { type: String, enum: ["Aluno", "Treinador"] }, 
  receiver: { type: mongoose.Schema.Types.ObjectId, refPath: "receiverModel" },
  receiverModel: { type: String, enum: ["Aluno", "Treinador"] },
  text: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Chat", ChatSchema);