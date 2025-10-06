import express from "express";
import Contract from "../conexao/Contract/ContractSchema.js";

const router = express.Router();

// Criar Contract
router.post("/", async (req, res) => {
  try {
    const contract = new Contract(req.body);
    await contract.save();

    // Retornar já populado
    const populatedContract = await Contract.findById(contract._id)
      .populate("aluno", "nome")
      .populate("treinador", "nome");

    res.status(201).json(populatedContract); // <- sempre enviar o populated
  } catch (err) {
    console.error("Erro ao criar contrato:", err); // log detalhado no console
    res.status(400).json({ error: err.message || err }); // enviar erro legível
  }
});


// Listar todos contratos
router.get("/", async (req, res) => {
  try {
    const contracts = await Contract.find()
      .populate("aluno", "nome")
      .populate("treinador", "nome");
    res.json(contracts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Buscar por ID
router.get("/:id", async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id)
      .populate("aluno", "nome")
      .populate("treinador", "nome");
    if (!contract) return res.status(404).json({ error: "Contract não encontrado" });
    res.json(contract);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Atualizar
router.put("/:id", async (req, res) => {
  try {
    const contract = await Contract.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("aluno", "nome")
      .populate("treinador", "nome");
    res.json(contract);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Deletar
router.delete("/:id", async (req, res) => {
  try {
    await Contract.findByIdAndDelete(req.params.id);
    res.json({ message: "Contract deletado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
