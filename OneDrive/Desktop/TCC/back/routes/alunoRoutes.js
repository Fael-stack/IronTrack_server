import express from "express";
import Aluno from "../conexao/Aluno/AlunoSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// ✅ Criar aluno com token
router.post("/", async (req, res) => {
  try {
    const { name, email, password, phone, weight, height, birthDate, payment_info } = req.body;

    // Verifica se todos os campos estão preenchidos
    if (!name || !email || !password || !phone || !weight || !height || !birthDate || !payment_info?.card_number) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const existing = await Aluno.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email já cadastrado." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newAluno = new Aluno({
      name,
      email,
      hashedPassword,
      phone,
      weight,
      height,
      birthDate: new Date(birthDate),
      paymentCustomerId: payment_info.card_number,
    });

    await newAluno.save();

    const token = jwt.sign(
      { id: newAluno._id, email: newAluno.email },
      process.env.JWT_SECRET || "SUA_CHAVE_SECRETA",
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Aluno criado com sucesso!",
      token,
      aluno: {
        id: newAluno._id,
        name: newAluno.name,
        email: newAluno.email,
        phone: newAluno.phone,
        weight: newAluno.weight,
        height: newAluno.height,
        birthDate: newAluno.birthDate,
        paymentCustomerId: newAluno.paymentCustomerId,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno ao cadastrar aluno." });
  }
});

// ✅ Listar todos os alunos
router.get("/", async (req, res) => {
  try {
    const alunos = await Aluno.find().select("-hashedPassword -__v"); // Remove campos sensíveis
    res.status(200).json(alunos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar alunos." });
  }
});

export default router;
