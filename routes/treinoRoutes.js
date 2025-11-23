// treinoRoutes.js
import express from "express";
import Treino from "../conexao/Treino/TreinoSchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

// buscar todos os treinos do usuário logado
router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    let treinos = await Treino.find({ userId });

    // Se não houver treinos, retorna um placeholder pq se não o app quebra
    if (treinos.length === 0) {
      treinos = [{
        _id: null,
        name: "Nenhum treino ainda",
        day_time: "",
        week_day: "",
        exercises: []
      }];
    }

    res.json(treinos);
  } catch (err) {
    console.error("Erro ao buscar treinos:", err);
    res.status(500).json({ error: "Erro interno ao buscar treinos" });
  }
});


router.get("/:treinoId", async (req, res) => {
  try {
    const userId = req.user.id;
    const treino = await Treino.findOne({ _id: req.params.treinoId, userId });

    if (!treino) {
      return res.status(404).json({ error: "Treino não encontrado" });
    }

    res.json(treino);
  } catch (err) {
    console.error("Erro ao buscar treino:", err);
    res.status(500).json({ error: "Erro interno ao buscar treino" });
  }
});


router.post("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, day_time, week_day, exercises } = req.body;

    if (!name || !day_time || !week_day) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }

    const novoTreino = new Treino({
      name,
      day_time,
      week_day,
      exercises: exercises || [],
      userId
    });

    await novoTreino.save();
    res.status(201).json(novoTreino);
  } catch (err) {
    console.error("Erro ao criar treino:", err);
    res.status(500).json({ error: "Erro interno ao criar treino" });
  }
});

//  Adicionar exercício a um treino do usuário
router.post("/:treinoId/exercises", async (req, res) => {
  try {
    const userId = req.user.id;
    const treino = await Treino.findOne({ _id: req.params.treinoId, userId });

    if (!treino) return res.status(404).json({ error: "Treino não encontrado" });

    const { name, details } = req.body;
    if (!name || !details) return res.status(400).json({ error: "Nome e detalhes do exercício obrigatórios" });

    treino.exercises.push({ name, details, completed: false });
    await treino.save();

    res.json(treino);
  } catch (err) {
    console.error("Erro ao adicionar exercício:", err);
    res.status(500).json({ error: "Erro interno ao adicionar exercício" });
  }
});

//  Marcar exercício como completo/incompleto
router.patch("/:treinoId/exercises/:exerciseId/complete", async (req, res) => {
  try {
    const userId = req.user.id;
    const treino = await Treino.findOne({ _id: req.params.treinoId, userId });
    if (!treino) return res.status(404).json({ error: "Treino não encontrado" });

    const exercise = treino.exercises.id(req.params.exerciseId);
    if (!exercise) return res.status(404).json({ error: "Exercício não encontrado" });

    exercise.completed = !exercise.completed;
    await treino.save();

    res.json(treino);
  } catch (err) {
    console.error("Erro ao atualizar exercício:", err);
    res.status(500).json({ error: "Erro interno ao atualizar exercício" });
  }
});

//  Deletar exercício
router.delete("/:treinoId/exercises/:exerciseId", async (req, res) => {
  try {
    const userId = req.user.id;
    const treino = await Treino.findOne({ _id: req.params.treinoId, userId });
    if (!treino) return res.status(404).json({ error: "Treino não encontrado" });

    treino.exercises.id(req.params.exerciseId)?.remove();
    await treino.save();

    res.json(treino);
  } catch (err) {
    console.error("Erro ao deletar exercício:", err);
    res.status(500).json({ error: "Erro interno ao deletar exercício" });
  }
});

//  Deletar treino completo
router.delete("/:treinoId", async (req, res) => {
  try {
    const userId = req.user.id;
    const treino = await Treino.findOneAndDelete({ _id: req.params.treinoId, userId });
    if (!treino) return res.status(404).json({ error: "Treino não encontrado" });

    res.json({ message: "Treino deletado com sucesso" });
  } catch (err) {
    console.error("Erro ao deletar treino:", err);
    res.status(500).json({ error: "Erro interno ao deletar treino" });
  }
});

//  Atualizar treino completo
router.put("/:treinoId", async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, day_time, week_day, exercises } = req.body;

    // Verifica se o treino pertence ao usuário pq se nao crasha o app
    const treino = await Treino.findOne({ _id: req.params.treinoId, userId });
    if (!treino) {
      return res.status(404).json({ error: "Treino não encontrado" });
    }

    // Atualiza os campos recebidos
    treino.name = name ?? treino.name;
    treino.day_time = day_time ?? treino.day_time;
    treino.week_day = week_day ?? treino.week_day;
    treino.exercises = exercises ?? treino.exercises;

    await treino.save();
    res.json(treino);
  } catch (err) {
    console.error("Erro ao atualizar treino:", err);
    res.status(500).json({ error: "Erro interno ao atualizar treino" });
  }
});


export default router;
