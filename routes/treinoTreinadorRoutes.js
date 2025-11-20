// back/routes/treinoTreinadorRoutes.js
import express from "express";
import Treino from "../conexao/Treino/TreinoSchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkTreinadorContrato } from "../middlewares/checkTreinadorContrato.js";

const router = express.Router();

// Todas rotas usam authMiddleware
router.use(authMiddleware);

// =========================
// Criar treino para um aluno
// =========================
router.post("/", (req, res) => {
    const { role } = req.user;

    if (role !== "Treinador") {
        return res.status(403).json({ error: "Apenas treinadores podem acessar essa rota." });
    }

    if (!req.body.userId) {
        return res.status(400).json({ error: "userId (aluno) é obrigatório." });
    }

    // Passa o controle para o middleware de contrato
    checkTreinadorContrato(req, res, async () => {
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

// =========================
// Listar treinos de um aluno (treinador)
// =========================
router.get("/user/:userId", async (req, res) => {
  try {
    const { role } = req.user;
    const { userId } = req.params;

    if (role !== "Treinador") {
      return res.status(403).json({ error: "Apenas treinadores podem acessar essa rota." });
    }

    // Agora o middleware recebe alunoId corretamente via params
    await checkTreinadorContrato(req, res, () => {});

    const treinos = await Treino.find({ userId });
    return res.json(treinos || []);

  } catch (err) {
    console.error("Erro ao listar treinos do aluno (treinador):", err);
    res.status(500).json({ error: "Erro interno ao buscar treinos" });
  }
});



// =========================
// Buscar treino por id
// =========================
router.get("/:id", async (req, res) => {
    try {
        const treino = await Treino.findById(req.params.id);
        if (!treino) return res.status(404).json({ error: "Treino não encontrado" });

        const { role } = req.user;

        if (role === "Treinador") {
            req.body.userId = treino.userId;

            return checkTreinadorContrato(req, res, () => {
                return res.json(treino);
            });

        } else if (role === "Aluno" && treino.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: "Não autorizado" });
        }

        return res.json(treino);

    } catch (err) {
        console.error("Erro ao buscar treino por id:", err);
        return res.status(500).json({ error: "Erro interno" });
    }
});

// =========================
// Atualizar treino
// =========================
router.put("/:id", async (req, res) => {
    try {
        const treino = await Treino.findById(req.params.id);
        if (!treino) return res.status(404).json({ error: "Treino não encontrado" });

        const { role } = req.user;

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

        } else if (role === "Aluno" && treino.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: "Aluno não autorizado." });
        }

    } catch (err) {
        console.error("Erro ao atualizar treino:", err);
        return res.status(500).json({ error: "Erro interno ao atualizar treino" });
    }
});

// =========================
// Deletar treino
// =========================
router.delete("/:id", async (req, res) => {
    try {
        const treino = await Treino.findById(req.params.id);
        if (!treino) return res.status(404).json({ error: "Treino não encontrado" });

        const { role } = req.user;

        if (role === "Treinador") {
            req.body.userId = treino.userId;

            return checkTreinadorContrato(req, res, async () => {
                await Treino.findByIdAndDelete(req.params.id);
                return res.json({ message: "Treino deletado com sucesso" });
            });

        } else if (role === "Aluno" && treino.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: "Aluno não autorizado." });
        }

    } catch (err) {
        console.error("Erro ao deletar treino:", err);
        return res.status(500).json({ error: "Erro interno ao deletar treino" });
    }
});

export default router;
