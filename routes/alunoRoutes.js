import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Aluno from "../conexao/Aluno/AlunoSchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Criar aluno com geração de token
router.post("/", async (req, res) => {
  try {
    const { name, email, password, phone, weight, height, birthDate, payment_info } = req.body;

    if (!name || !email || !password || !phone || !weight || !height || !birthDate || !payment_info?.card_number) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const existingAluno = await Aluno.findOne({ email });
    if (existingAluno) {
      return res.status(400).json({ error: "Email já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const aluno = await Aluno.create({
      name,
      email,
      hashedPassword,
      phone,
      weight,
      height,
      birthDate: new Date(birthDate),
      paymentCustomerId: payment_info.card_number,
    });

    // 🔑 Cria token JWT válido por 1 hora
    const token = jwt.sign(
      { id: aluno._id, email: aluno.email },
      process.env.JWT_SECRET || "SUA_CHAVE_SECRETA",
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Conta criada com sucesso!",
      token,
      aluno: {
        id: aluno._id,
        name: aluno.name,
        email: aluno.email,
        phone: aluno.phone,
        weight: aluno.weight,
        height: aluno.height,
        birthDate: aluno.birthDate,
        paymentCustomerId: aluno.paymentCustomerId,
      },
    });
  } catch (err) {
    console.error("Erro ao criar aluno:", err);
    res.status(500).json({ error: "Erro interno ao cadastrar aluno." });
  }
});

// ✅ Listar todos os alunos (sem senha)
router.get("/", async (req, res) => {
  try {
    const alunos = await Aluno.find().select("-hashedPassword -__v");
    res.status(200).json(alunos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar alunos." });
  }
});

// ✅ Buscar dados do aluno logado
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.user.id).select("-password");
    if (!aluno) return res.status(404).json({ message: "Aluno não encontrado" });
    res.json(aluno);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar aluno logado" });
  }
});

export default router;
