import express from "express";
import Chat from "../conexao/Chat/ChatSchema.js";

const router = express.Router();

// Criar Chat
router.post("/", async (req, res) => {
  try {
    const Chat = new Chat(req.body);
    await Chat.save();
    res.status(201).json(Chat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todos
router.get("/", async (req, res) => {
  const Chats = await Chat.find();
  res.json(Chats);
});

// Buscar por ID
router.get("/:id", async (req, res) => {
  try {
    const Chat = await Chat.findById(req.params.id);
    if (!Chat) return res.status(404).json({ error: "Chat não encontrado" });
    res.json(Chat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Atualizar
router.put("/:id", async (req, res) => {
  try {
    const Chat = await Chat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(Chat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Deletar
router.delete("/:id", async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);
    res.json({ message: "Chat deletado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
