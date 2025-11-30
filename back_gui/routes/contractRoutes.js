//back_gui\routes\contractRoutes.js
import express from "express";
import mongoose from "mongoose";
import Contract from "../conexao/Contract/ContractSchema.js";
import Chat from "../conexao/Chat/ChatSchema.js";
import Offer from "../conexao/Offer/OfferSchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const alunoId = req.user?.id || req.user?._id;
    if (!alunoId) return res.status(401).json({ error: "Usuário não autenticado" });

    const { descricao, preco, offer } = req.body;

    if (!descricao) return res.status(400).json({ error: "Descricao obrigatória" });
    if (preco == null || isNaN(preco) || Number(preco) < 0) return res.status(400).json({ error: "Preço inválido" });

    const payload = {
      aluno: alunoId,
      descricao,
      preco: Number(preco),
      status: "pendente",
      offer: offer || null,
      treinador: req.body.treinador || null
    };

    if (offer) {
      const found = await Offer.findById(offer);
      if (!found) return res.status(400).json({ error: "Offer não encontrada" });
      if (found.ativo === false) return res.status(400).json({ error: "Offer está inativa" });
      payload.treinador = found.treinador;
    }

    if (!payload.treinador) return res.status(400).json({ error: "Treinador obrigatório" });

    const contract = new Contract(payload);
    await contract.save();

    try {
      const existingChat = await Chat.findOne({ contract: contract._id });
      if (!existingChat) {
        const chat = new Chat({ contract: contract._id, mensagens: [] });
        await chat.save();
      }
    } catch (errChat) {
      console.error("Erro ao criar chat para contrato pendente:", errChat);
    }

    res.status(201).json(contract);
  } catch (err) {
    console.error("Erro criar contrato:", err);
    res.status(500).json({ error: err.message || err });
  }
});

router.get("/", async (req, res) => {
  try {
    const contracts = await Contract.find().populate("aluno treinador offer");
    res.json(contracts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id).populate("aluno treinador offer");
    if (!contract) return res.status(404).json({ error: "Contrato não encontrado" });
    res.json(contract);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message || err });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const userId = req.user?.id || req.user?._id;
  if (!userId) return res.status(401).json({ error: "Usuário não autenticado" });

  const toStatus = req.body?.status;
  try {
    const prev = await Contract.findById(req.params.id);
    if (!prev) return res.status(404).json({ error: "Contrato não encontrado" });


    if (toStatus === "ativo") {
      if (prev.treinador.toString() !== String(userId)) {
        return res.status(403).json({ error: "Somente o treinador dono do contrato pode confirmar" });
      }

      try {
        const updated = await Contract.findOneAndUpdate(
          { _id: req.params.id, status: "pendente" },
          { $set: { status: "ativo" } },
          { new: true }
        ).populate("aluno treinador offer");

        if (!updated) {
          return res.status(409).json({ error: "Contrato já foi processado ou não está mais pendente" });
        }
        try {
          const existingChat = await Chat.findOne({ contract: updated._id });
          if (!existingChat) {
            await new Chat({ contract: updated._id, mensagens: [] }).save();
          }
        } catch (errChat) {
          console.warn("Aviso: falha ao criar chat (não fatal):", errChat);
        }
        return res.json(updated);
      } catch (errAct) {
        console.error("Erro ao ativar contrato (sem transaction):", errAct);
        return res.status(500).json({ error: "Falha ao ativar contrato" });
      }
    }

    const allowed = (prev.aluno.toString() === String(userId)) || (prev.treinador.toString() === String(userId));
    if (!allowed) return res.status(403).json({ error: "Não autorizado a modificar esse contrato" });

    if (req.body.preco != null && (isNaN(req.body.preco) || Number(req.body.preco) < 0)) {
      return res.status(400).json({ error: "Preço inválido" });
    }
    if (req.body.status && !["pendente", "ativo", "cancelado"].includes(req.body.status)) {
      return res.status(400).json({ error: "Status inválido" });
    }

    const updated = await Contract.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("aluno treinador offer");
    res.json(updated);
  } catch (err) {
    console.error("Erro no PUT /contracts/:id:", err);
    res.status(500).json({ error: err.message || err });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ error: "Usuário não autenticado" });

    const c = await Contract.findById(req.params.id);
    if (!c) return res.status(404).json({ error: "Contrato não encontrado" });

    const allowed = (c.aluno.toString() === String(userId)) || (c.treinador.toString() === String(userId));
    if (!allowed) return res.status(403).json({ error: "Não autorizado a deletar esse contrato" });

    await Contract.findByIdAndDelete(req.params.id);
    await Chat.findOneAndDelete({ contract: req.params.id });

    res.json({ message: "Contrato deletado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || err });
  }
});
router.get("/treinador/:treinadorId/alunos", async (req, res) => {
  try {
    const { treinadorId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(treinadorId)) {
      return res.status(400).json({ error: "treinadorId inválido" });
    }
    const contracts = await Contract.find({ treinador: treinadorId }).populate("aluno");
    const raw = contracts
      .map(c => c.aluno)
      .filter(Boolean)
      .map(a => ({ _id: String(a._id || a.id), name: a.nome || a.name || a.username || "Aluno" }));

    const unique = {};
    raw.forEach(a => { if (a._id) unique[a._id] = a; });

    const alunos = Object.values(unique);
    return res.json(alunos);
  } catch (err) {
    console.error("Erro GET /contracts/treinador/:treinadorId/alunos:", err);
    return res.status(500).json({ error: err.message || "Erro interno" });
  }
});

export default router;
