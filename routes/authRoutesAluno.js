import express from "express";
import Aluno from "../conexao/Aluno/AlunoSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Login do Aluno
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    const aluno = await Aluno.findOne({ email });
    if (!aluno) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    // Verifica senha
    const senhaValida = bcrypt.compareSync(password, aluno.password);
    if (!senhaValida) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    // Cria token JWT
    const token = jwt.sign(
      { id: aluno._id, email: aluno.email },
      "SUA_CHAVE_SECRETA", // melhor usar process.env.JWT_SECRET
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login realizado com sucesso",
      token,
      aluno: {
        id: aluno._id,
        name: aluno.name,
        email: aluno.email,
        age: aluno.age,
        imc: aluno.imc
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

export default router;
