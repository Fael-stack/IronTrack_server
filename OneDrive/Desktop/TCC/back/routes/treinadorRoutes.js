import express from "express";
import Treinador from "../conexao/Treinador/TreinadorSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// ✅ Criar treinador com token
router.post("/", async (req, res) => {
  try {
    const { name, email, password, certification, birthDate, payment_info } = req.body;

    // Todos os campos obrigatórios
    if (!name || !email || !password || !certification || !birthDate || !payment_info?.card_number) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const existing = await Treinador.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Já existe um treinador com esse email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const novoTreinador = new Treinador({
      nome: name,
      email,
      cref: certification,
      hashedPassword,
      dataNascimento: new Date(birthDate),
      paymentCustomerId: payment_info.card_number,
    });

    await novoTreinador.save();

    const token = jwt.sign(
      { id: novoTreinador._id, email: novoTreinador.email },
      process.env.JWT_SECRET || "SUA_CHAVE_SECRETA",
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Treinador criado com sucesso!",
      token,
      treinador: {
        id: novoTreinador._id,
        nome: novoTreinador.nome,
        email: novoTreinador.email,
        cref: novoTreinador.cref,
        dataNascimento: novoTreinador.dataNascimento,
        paymentCustomerId: novoTreinador.paymentCustomerId,
      },
    });

  } catch (err) {
    console.error("Erro ao criar treinador:", err);
    res.status(500).json({ error: "Erro interno ao cadastrar treinador." });
  }
});

// ✅ Listar todos os treinadores
router.get("/", async (req, res) => {
  try {
    const treinadores = await Treinador.find(); // retorna todos os campos
    res.status(200).json(treinadores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar treinadores." });
  }
});


export default router;
