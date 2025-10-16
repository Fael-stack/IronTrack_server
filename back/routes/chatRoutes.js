import express from "express";
import Chat from "../conexao/Chat/ChatSchema.js";

const router = express.Router();

// Listar chats
router.get("/", async (req, res) => {
  const chats = await Chat.find().populate("contract mensagens.remetente");
  res.json(chats);
});

// Buscar chat por contractId
router.get("/contract/:contractId", async (req, res) => {
  try {
    const chat = await Chat.findOne({ contract: req.params.contractId }).populate("mensagens.remetente");
    if (!chat) return res.status(404).json({ error: "Chat não encontrado" });
    res.json(chat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
