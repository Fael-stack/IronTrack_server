// back_gui/routes/treinadorRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Treinador from "../conexao/Treinador/TreinadorSchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, password, certification, birthDate, payment_info } = req.body;

    if (!name || !email || !password || !certification || !birthDate || !payment_info?.card_number) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const existingTreinador = await Treinador.findOne({ email });
    if (existingTreinador) {
      return res.status(400).json({ error: "Já existe um treinador com esse email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const treinador = await Treinador.create({
      nome: name,
      email,
      cref: certification,
      hashedPassword,
      dataNascimento: new Date(birthDate),
      paymentCustomerId: payment_info.card_number,
    });

    const token = jwt.sign(
      { id: treinador._id, email: treinador.email, role: "Treinador" },
      process.env.JWT_SECRET || "SUA_CHAVE_SECRETA",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Conta criada com sucesso!",
      token,
      treinador: {
        id: treinador._id,
        nome: treinador.nome,
        email: treinador.email,
        cref: treinador.cref,
        dataNascimento: treinador.dataNascimento,
        paymentCustomerId: treinador.paymentCustomerId,
        role: "Treinador"
      },
    });
  } catch (err) {
    console.error("Erro ao criar treinador:", err);
    res.status(500).json({ error: "Erro interno ao cadastrar treinador." });
  }
});

router.get("/", async (req, res) => {
  try {
    const treinadores = await Treinador.find().select("-hashedPassword -__v");
    res.status(200).json(treinadores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar treinadores." });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    if (!req.user || req.user.role !== "Treinador") {
      return res.status(403).json({ message: "Acesso negado: role mismatch" });
    }
    const treinador = await Treinador.findById(req.user.id).select("-hashedPassword");
    if (!treinador) {
      return res.status(404).json({ message: "Treinador não encontrado" });
    }
    res.json(treinador);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar treinador logado" });
  }
});

export default router;
