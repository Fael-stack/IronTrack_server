// back_gui/routes/dietaRoutes.js
import express from "express";
import Dieta from "../conexao/Dieta/DietaSchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkTreinadorContrato } from "../middlewares/checkTreinadorContrato.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { role, id } = req.user;

    if (role === "Aluno") {
      req.body.userId = id;
    }

    if (role === "Treinador") {
      await checkTreinadorContrato(req, res, () => {});
    }

    const novaDieta = new Dieta(req.body);
    await novaDieta.save();

    return res.status(201).json(novaDieta);
  } catch (err) {
    console.error("Erro ao criar dieta:", err);
    res.status(400).json({ error: err.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("Buscando dietas para userId:", userId);

  try {
    const dietas = await Dieta.find({ userId });
    res.json(dietas || []);
  } catch (err) {
    console.error("Erro ao buscar dietas:", err);
    res.status(400).json({ error: err.message });
  }
});

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

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { role, id } = req.user;

    const dieta = await Dieta.findById(req.params.id);
    if (!dieta) return res.status(404).json({ error: "Dieta não encontrada" });

    if (role === "Aluno" && dieta.userId.toString() !== id) {
      return res.status(403).json({ error: "Aluno não autorizado." });
    }

    if (role === "Treinador") {
      req.body.userId = dieta.userId;
      await checkTreinadorContrato(req, res, () => {});
    }

    const dietaAtualizada = await Dieta.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json(dietaAtualizada);
  } catch (err) {
    console.error("Erro ao atualizar dieta:", err);
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { role, id } = req.user;

    const dieta = await Dieta.findById(req.params.id);
    if (!dieta) return res.status(404).json({ error: "Dieta não encontrada" });

    if (role === "Aluno" && dieta.userId.toString() !== id) {
      return res.status(403).json({ error: "Não autorizado a deletar." });
    }

    if (role === "Treinador") {
      req.body.userId = dieta.userId;
      await checkTreinadorContrato(req, res, () => {});
    }

    await Dieta.findByIdAndDelete(req.params.id);
    res.json({ message: "Dieta deletada com sucesso" });
  } catch (err) {
    console.error("Erro ao deletar dieta:", err);
    res.status(400).json({ error: err.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const dietas = await Dieta.find({ userId: req.user.id });
    res.json(dietas);
  } catch (err) {
    console.error("Erro ao buscar dietas:", err);
    res.status(400).json({ error: err.message });
  }
});

export default router;
