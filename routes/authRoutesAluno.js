import express from "express";
import Aluno from "../conexao/Aluno/AlunoSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

//  LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    const aluno = await Aluno.findOne({ email });
    if (!aluno) {
      return res.status(401).json({ error: "Email ou senha inválidos." });
    }

    const isPasswordValid = bcrypt.compareSync(password, aluno.hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Email ou senha inválidos." });
    }

    const token = jwt.sign(
      { id: aluno._id, email: aluno.email, role: "Aluno" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );


    res.json({
      message: "Login bem-sucedido.",
      token,
      aluno: {
        id: aluno._id,
        name: aluno.name,
        email: aluno.email,
        age: aluno.age,
        weight: aluno.weight,
        height: aluno.height,
        phone: aluno.phone,
        role: "Aluno",
      },
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: "Erro no servidor durante o login." });
  }
});

//  
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.user.id).select("-hashedPassword");
    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado." });
    }

    res.json({
      id: aluno._id,
      name: aluno.name,
      email: aluno.email,
      age: aluno.age,
      weight: aluno.weight,
      height: aluno.height,
      phone: aluno.phone,
    });
  } catch (err) {
    console.error("Erro ao buscar aluno logado:", err);
    res.status(500).json({ error: "Erro no servidor ao buscar aluno logado." });
  }
});

export default router;
