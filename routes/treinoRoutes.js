import express from "express";
import Treino from "../conexao/Treino/TreinoSchema.js";

const router = express.Router();

// Middleware para pegar treino por ID
async function getTreino(req, res, next) {
  try {
    const treino = await Treino.findById(req.params.id);
    if (!treino) return res.status(404).json({ error: "Treino não encontrado" });
    req.treino = treino;
    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// ========================== ROTAS ==========================

// Rota para testar /treinos
router.get("/", async (req, res) => {
  try {
    const treinos = await Treino.find();
    res.json(treinos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todos os treinos de um usuário
router.get("/user/:userId", async (req, res) => {
  try {
    const treinos = await Treino.find({ userId: req.params.userId });
    res.json(treinos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Criar treino para um usuário
router.post("/user/:userId", async (req, res) => {
  try {
    const treino = new Treino({ ...req.body, userId: req.params.userId });
    await treino.save();
    res.status(201).json(treino);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Atualizar treino
router.put("/:id", getTreino, async (req, res) => {
  try {
    Object.assign(req.treino, req.body);
    await req.treino.save();
    res.json(req.treino);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Deletar treino
router.delete("/:id", getTreino, async (req, res) => {
  try {
    await req.treino.deleteOne();
    res.json({ message: "Treino deletado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ========================== EXERCÍCIOS ==========================

// Adicionar exercício
router.post("/:id/exercises", getTreino, async (req, res) => {
  try {
    if (!req.treino.exercises) req.treino.exercises = [];
    req.treino.exercises.push({ ...req.body, completed: false });
    await req.treino.save();
    res.json(req.treino);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Editar exercício
router.patch("/:id/exercises/:exerciseId", getTreino, async (req, res) => {
  try {
    const ex = req.treino.exercises.id(req.params.exerciseId);
    if (!ex) return res.status(404).json({ error: "Exercício não encontrado" });
    Object.assign(ex, req.body);
    await req.treino.save();
    res.json(req.treino);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Marcar exercício como completo/incompleto
router.patch("/:id/exercises/:exerciseId/complete", getTreino, async (req, res) => {
  try {
    const ex = req.treino.exercises.id(req.params.exerciseId);
    if (!ex) return res.status(404).json({ error: "Exercício não encontrado" });
    ex.completed = !ex.completed;
    await req.treino.save();
    res.json(req.treino);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Deletar exercício
router.delete("/:id/exercises/:exerciseId", getTreino, async (req, res) => {
  try {
    req.treino.exercises.pull({ _id: req.params.exerciseId });
    await req.treino.save();
    res.json(req.treino);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
