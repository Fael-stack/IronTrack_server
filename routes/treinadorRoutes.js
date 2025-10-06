import express from "express";
import Treinador from "../conexao/Treinador/TreinadorSchema.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Criar Treinador
router.post("/", async (req, res) => {
  try {
    console.log("REQ BODY RECEBIDO:", req.body);

    const { name, age, certification, email, password, payment_info = {} } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email e password são obrigatórios" });
    }

    // Verifica se o email já existe
    const existing = await Treinador.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // Hash da senha
    const hashedPassword = bcrypt.hashSync(password, 10);

    const novoTreinador = new Treinador({
      name,
      age: age ? Number(age) : undefined,
      certification,
      email,
      password: hashedPassword,
      payment_info: {
        card_number: payment_info.card_number || "",
        card_expiry: payment_info.card_expiry || "",
        card_cvv: payment_info.card_cvv || ""
      }
    });

    await novoTreinador.save();
    res.status(201).json(novoTreinador);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todos
router.get("/", async (req, res) => {
  const Treinadores = await Treinador.find();
  res.json(Treinadores);
});

// Buscar por ID
router.get("/:id", async (req, res) => {
  try {
    const Treinador = await Treinador.findById(req.params.id);
    if (!Treinador) return res.status(404).json({ error: "Treinador não encontrado" });
    res.json(Treinador);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Atualizar
router.put("/:id", async (req, res) => {
  try {
    const Treinador = await Treinador.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(Treinador);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Deletar
router.delete("/:id", async (req, res) => {
  try {
    await Treinador.findByIdAndDelete(req.params.id);
    res.json({ message: "Treinador deletado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
