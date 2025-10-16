import express from "express";
import Treinador from "../conexao/Treinador/TreinadorSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; // RECEBE A SENHA EM TEXTO PURO

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    const treinador = await Treinador.findOne({ email });
    if (!treinador) {
      return res.status(401).json({ error: "Email ou senha inválidos." });
    }

    // ✅ COMPARA SENHA COM hashedPassword DO BANCO
    const senhaValida = bcrypt.compareSync(password, treinador.hashedPassword);
    if (!senhaValida) {
      return res.status(401).json({ error: "Email ou senha inválidos." });
    }

    const token = jwt.sign(
      { id: treinador._id, email: treinador.email },
      process.env.JWT_SECRET || "SUA_CHAVE_SECRETA",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login realizado com sucesso",
      token,
      treinador: {
        id: treinador._id,
        nome: treinador.nome,
        email: treinador.email,
        cref: treinador.cref,
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Erro no servidor." });
  }
});

export default router;
