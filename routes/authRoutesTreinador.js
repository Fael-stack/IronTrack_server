import express from "express";
import Treinador from "../conexao/Treinador/TreinadorSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Login do Treinador
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    const treinador = await Treinador.findOne({ email });
    if (!treinador) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    // Verifica senha
    const senhaValida = bcrypt.compareSync(password, treinador.password);
    if (!senhaValida) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    // Cria token JWT
    const token = jwt.sign(
      { id: treinador._id, email: treinador.email },
      "SUA_CHAVE_SECRETA", // troque para uma variável de ambiente
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login realizado com sucesso",
      token,
      treinador: {
        id: treinador._id,
        name: treinador.name,
        email: treinador.email,
        certification: treinador.certification
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

export default router;
