// back_gui/routes/treinoTreinadorRoutes.js
import express from "express";
import Treino from "../conexao/Treino/TreinoSchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkTreinadorContrato } from "../middlewares/checkTreinadorContrato.js";

const router = express.Router();

// todas as rotas deste arquivo exigem autenticação
router.use(authMiddleware);

// Criar treino (treinador) — exige role Treinador e contrato válido
router.post("/", async (req, res) => {
  const { role } = req.user;

  if (role !== "Treinador") {
    return res.status(403).json({ error: "Apenas treinadores podem acessar essa rota." });
  }

  if (!req.body.userId) {
    return res.status(400).json({ error: "userId (aluno) é obrigatório." });
  }

  // valida contrato e em caso de sucesso cria o treino
  return checkTreinadorContrato(req, res, async () => {
    try {
      const { name, day_time, week_day, exercises } = req.body;

      const novoTreino = new Treino({
        name,
        day_time,
        week_day,
        exercises: exercises || [],
        userId: req.body.userId,
      });

      await novoTreino.save();
      return res.status(201).json(novoTreino);
    } catch (err) {
      console.error("Erro ao criar treino (treinador):", err);
      return res.status(500).json({ error: "Erro interno ao criar treino" });
    }
  });
});

// Listar treinos de um aluno (treinador) — agora usando checkTreinadorContrato como middleware
router.get("/user/:userId", checkTreinadorContrato, async (req, res) => {
  try {
    const { userId } = req.params;
    const treinos = await Treino.find({ userId });
    return res.json(treinos || []);
  } catch (err) {
    console.error("Erro ao listar treinos do aluno (treinador):", err);
    res.status(500).json({ error: "Erro interno ao buscar treinos" });
  }
});

// Buscar por id
router.get("/:id", async (req, res) => {
  try {
    const treino = await Treino.findById(req.params.id);
    if (!treino) return res.status(404).json({ error: "Treino não encontrado" });

    const { role, id: userId } = req.user;

    if (role === "Treinador") {
      // treinador precisa possuir contrato com o aluno dono do treino
      req.body.userId = treino.userId;
      return checkTreinadorContrato(req, res, () => res.json(treino));
    } else if (role === "Aluno" && treino.userId.toString() !== String(userId)) {
      return res.status(403).json({ error: "Não autorizado" });
    }

    return res.json(treino);
  } catch (err) {
    console.error("Erro ao buscar treino por id:", err);
    return res.status(500).json({ error: "Erro interno" });
  }
});

// Atualizar treino
router.put("/:id", async (req, res) => {
  try {
    const treino = await Treino.findById(req.params.id);
    if (!treino) return res.status(404).json({ error: "Treino não encontrado" });

    const { role, id: userId } = req.user;

    if (role === "Treinador") {
      req.body.userId = treino.userId;
      return checkTreinadorContrato(req, res, async () => {
        const { name, day_time, week_day, exercises } = req.body;

        treino.name = name ?? treino.name;
        treino.day_time = day_time ?? treino.day_time;
        treino.week_day = week_day ?? treino.week_day;
        treino.exercises = exercises ?? treino.exercises;

        await treino.save();
        return res.json(treino);
      });
    } else if (role === "Aluno" && treino.userId.toString() !== String(userId)) {
      return res.status(403).json({ error: "Aluno não autorizado." });
    }

    // caso aluno dono, as alterações já foram aplicadas acima?
    // Se chegou aqui sem role Treinador e sem mismatch, atualizamos normalmente:
    const { name, day_time, week_day, exercises } = req.body;
    treino.name = name ?? treino.name;
    treino.day_time = day_time ?? treino.day_time;
    treino.week_day = week_day ?? treino.week_day;
    treino.exercises = exercises ?? treino.exercises;
    await treino.save();
    res.json(treino);
  } catch (err) {
    console.error("Erro ao atualizar treino:", err);
    return res.status(500).json({ error: "Erro interno ao atualizar treino" });
  }
});

// Deletar treino
router.delete("/:id", async (req, res) => {
  try {
    const treino = await Treino.findById(req.params.id);
    if (!treino) return res.status(404).json({ error: "Treino não encontrado" });

    const { role, id: userId } = req.user;

    if (role === "Treinador") {
      req.body.userId = treino.userId;
      return checkTreinadorContrato(req, res, async () => {
        await Treino.findByIdAndDelete(req.params.id);
        return res.json({ message: "Treino deletado com sucesso" });
      });
    } else if (role === "Aluno" && treino.userId.toString() !== String(userId)) {
      return res.status(403).json({ error: "Aluno não autorizado." });
    }

    // se chegou aqui e é dono (aluno), permite deletar
    await Treino.findByIdAndDelete(req.params.id);
    res.json({ message: "Treino deletado com sucesso" });
  } catch (err) {
    console.error("Erro ao deletar treino:", err);
    return res.status(500).json({ error: "Erro interno ao deletar treino" });
  }
});

export default router;
