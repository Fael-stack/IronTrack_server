import express from "express";
import Aluno from "../conexao/Aluno/AlunoSchema.js"; // trocar Student por Aluno
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    const aluno = await Aluno.findOne({ email }); // trocar Student por Aluno
    if (!aluno) {
      return res.status(401).json({ error: "Email ou senha inválidos." });
    }

    const isPasswordValid = bcrypt.compareSync(password, aluno.hashedPassword); // ou aluno.password se for o campo correto
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Email ou senha inválidos." });
    }

    const token = jwt.sign(
      { id: aluno._id, email: aluno.email },
      process.env.JWT_SECRET || "SUA_CHAVE_SECRETA",
      { expiresIn: "1h" }
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
      },
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: "Erro no servidor durante o login." });
  }
});

export default router;
