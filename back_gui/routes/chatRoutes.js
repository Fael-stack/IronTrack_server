// back_gui\routes\chatRoutes.js
import express from "express";
import Chat from "../conexao/Chat/ChatSchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const chats = await Chat.find().populate("contract mensagens.remetente");
    res.json(chats);
  } catch (err) {
    console.error("Erro listar chats:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/contract/:contractId", authMiddleware, async (req, res) => {
  try {
    const chat = await Chat.findOne({ contract: req.params.contractId })
      .populate("mensagens.remetente")
      .lean();

    if (!chat) return res.status(404).json({ error: "Chat não encontrado" });
    res.json({ mensagens: chat.mensagens });
  } catch (err) {
    console.error("Erro buscar chat por contrato:", err);
    res.status(400).json({ error: err.message });
  }
});

export default router;
