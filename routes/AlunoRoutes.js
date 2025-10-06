import express from "express";
import Aluno from "../conexao/Aluno/AlunoSchema.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Criar aluno
router.post("/", async (req, res) => {
  try {
    const { name, age, email, password, phone, weight, height } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email e password são obrigatórios" });
    }

    // Verifica se email já existe
    const existing = await Aluno.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // Hash da senha
    const hashedPassword = bcrypt.hashSync(password, 10);

    const novoAluno = new Aluno({
      name,
      age: age ? Number(age) : undefined,
      email,
      password: hashedPassword,
      phone,
      weight,
      height
    });

    await novoAluno.save();
    res.status(201).json(novoAluno);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todos
router.get("/", async (req, res) => {
  const alunos = await Aluno.find();
  res.json(alunos);
});




// Buscar por ID
router.get("/:id", async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });
    res.json(aluno);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Atualizar
router.put("/:id", async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(aluno);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Deletar
router.delete("/:id", async (req, res) => {
  try {
    await Aluno.findByIdAndDelete(req.params.id);
    res.json({ message: "Aluno deletado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
