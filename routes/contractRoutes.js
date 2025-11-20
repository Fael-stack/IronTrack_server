import express from "express";
import Contract from "../conexao/Contract/ContractSchema.js";
import Chat from "../conexao/Chat/ChatSchema.js";

const router = express.Router();

// Criar contrato
router.post("/", async (req, res) => {
  try {
    const contract = new Contract(req.body);
    await contract.save();

    // Criar chat automaticamente se o contrato for ativo
    if (contract.status === "ativo") {
      const chat = new Chat({ contract: contract._id, mensagens: [] });
      await chat.save();
    }

    res.status(201).json(contract);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todos
router.get("/", async (req, res) => {
  const contracts = await Contract.find().populate("aluno treinador");
  res.json(contracts);
});

// Buscar por ID
router.get("/:id", async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id).populate("aluno treinador");
    if (!contract) return res.status(404).json({ error: "Contrato não encontrado" });
    res.json(contract);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Atualizar contrato
router.put("/:id", async (req, res) => {
  try {
    const contract = await Contract.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Criar chat se status mudou para ativo
    if (contract.status === "ativo") {
      const existingChat = await Chat.findOne({ contract: contract._id });
      if (!existingChat) {
        const chat = new Chat({ contract: contract._id, mensagens: [] });
        await chat.save();
      }
    }

    res.json(contract);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Deletar contrato
router.delete("/:id", async (req, res) => {
  try {
    await Contract.findByIdAndDelete(req.params.id);
    // Opcional: deletar chat também
    await Chat.findOneAndDelete({ contract: req.params.id });
    res.json({ message: "Contrato deletado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Buscar todos os alunos que têm contrato com este treinador
router.get("/treinador/:id", async (req, res) => {
  try {
    const contratos = await Contract.find({ treinador: req.params.id })
      .populate("aluno");

    const alunos = contratos.map(c => ({
      _id: c.aluno._id,
      name: c.aluno.name,
      email: c.aluno.email
    }));

    res.json(alunos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


export default router;
