import express from "express";
import Dieta from "../conexao/Dieta/DietaSchema.js";

const router = express.Router();

// Criar Dieta
router.post("/", async (req, res) => {
  try {
    const novaDieta = new Dieta(req.body); 
    await novaDieta.save();
    res.status(201).json(novaDieta);
  } catch (err) {
    console.error("Erro ao criar dieta:", err);
    res.status(400).json({ error: err.message });
  }
});

// Listar dietas de um usuário
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("Buscando dietas para userId:", userId);

  try {
    const dietas = await Dieta.find({ userId });
    // Retorna sempre array, mesmo vazio
    res.json(dietas || []);
  } catch (err) {
    console.error("Erro ao buscar dietas:", err);
    res.status(400).json({ error: err.message });
  }
});

// Buscar por ID
router.get("/:id", async (req, res) => {
  try {
    const dieta = await Dieta.findById(req.params.id);
    if (!dieta) return res.status(404).json({ error: "Dieta não encontrada" });
    res.json(dieta);
  } catch (err) {
    console.error("Erro ao buscar dieta por ID:", err);
    res.status(400).json({ error: err.message });
  }
});

// Atualizar
router.put("/:id", async (req, res) => {
  try {
    const dieta = await Dieta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dieta) return res.status(404).json({ error: "Dieta não encontrada" });
    res.json(dieta);
  } catch (err) {
    console.error("Erro ao atualizar dieta:", err);
    res.status(400).json({ error: err.message });
  }
});

// Deletar
router.delete("/:id", async (req, res) => {
  try {
    const dieta = await Dieta.findByIdAndDelete(req.params.id);
    if (!dieta) return res.status(404).json({ error: "Dieta não encontrada" });
    res.json({ message: "Dieta deletada com sucesso" });
  } catch (err) {
    console.error("Erro ao deletar dieta:", err);
    res.status(400).json({ error: err.message });
  }
});

// Listar todas as dietas (somente para testes)
router.get("/", async (req, res) => {
  try {
    const dietas = await Dieta.find();
    res.json(dietas);
  } catch (err) {
    console.error("Erro ao buscar todas as dietas:", err);
    res.status(400).json({ error: err.message });
  }
});


export default router;
