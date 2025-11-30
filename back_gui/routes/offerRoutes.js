// back_gui\routes\offerRoutes.js
import express from "express";
import Offer from "../conexao/Offer/OfferSchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const treinadorId = req.user?.id || req.user?._id;
    if (!treinadorId) return res.status(401).json({ error: "Usuário não autenticado" });

    const { titulo = "Mentoria", descricao, diasDisponiveis, precoSemanal, ativo = true } = req.body;

    if (!descricao || typeof descricao !== "string") {
      return res.status(400).json({ error: "descricao (string) é obrigatória" });
    }
    if (!Array.isArray(diasDisponiveis) || diasDisponiveis.length === 0) {
      return res.status(400).json({ error: "diasDisponiveis precisa ser um array não vazio" });
    }
    if (precoSemanal == null || isNaN(precoSemanal) || Number(precoSemanal) < 0) {
      return res.status(400).json({ error: "precoSemanal precisa ser um número >= 0" });
    }

    const offer = await Offer.create({
      treinador: treinadorId,
      titulo,
      descricao,
      diasDisponiveis,
      precoSemanal: Number(precoSemanal),
      ativo: Boolean(ativo)
    });

    res.status(201).json(offer);
  } catch (err) {
    console.error("Erro criar offer:", err);
    res.status(500).json({ error: err.message || err });
  }
});

router.get("/", async (req, res) => {
  try {
    const query = {};
    if (req.query.treinador) query.treinador = req.query.treinador;
    const offers = await Offer.find(query).populate("treinador", "nome");
    res.json(offers);
  } catch (err) {
    console.error("Erro listar offers:", err);
    res.status(500).json({ error: err.message || err });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const treinadorId = req.user?.id || req.user?._id;
    if (!treinadorId) return res.status(401).json({ error: "Usuário não autenticado" });

    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ error: "Oferta não encontrada" });

    if (offer.treinador.toString() !== String(treinadorId)) {
      return res.status(403).json({ error: "Não autorizado a editar essa oferta" });
    }

    const { titulo, descricao, diasDisponiveis, precoSemanal, ativo } = req.body;

    if (descricao != null && typeof descricao !== "string") {
      return res.status(400).json({ error: "descricao inválida" });
    }
    if (diasDisponiveis != null && (!Array.isArray(diasDisponiveis) || diasDisponiveis.length === 0)) {
      return res.status(400).json({ error: "diasDisponiveis precisa ser um array não vazio" });
    }
    if (precoSemanal != null && (isNaN(precoSemanal) || Number(precoSemanal) < 0)) {
      return res.status(400).json({ error: "precoSemanal inválido" });
    }

    if (titulo !== undefined) offer.titulo = titulo;
    if (descricao !== undefined) offer.descricao = descricao;
    if (diasDisponiveis !== undefined) offer.diasDisponiveis = diasDisponiveis;
    if (precoSemanal !== undefined) offer.precoSemanal = Number(precoSemanal);
    if (ativo !== undefined) offer.ativo = Boolean(ativo);

    await offer.save();
    res.json(offer);
  } catch (err) {
    console.error("Erro atualizar offer:", err);
    res.status(500).json({ error: err.message || err });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const treinadorId = req.user?.id || req.user?._id;
    if (!treinadorId) return res.status(401).json({ error: "Usuário não autenticado" });

    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ error: "Oferta não encontrada" });

    if (offer.treinador.toString() !== String(treinadorId)) {
      return res.status(403).json({ error: "Não autorizado a deletar essa oferta" });
    }

    await Offer.findByIdAndDelete(req.params.id);
    res.json({ message: "Oferta deletada" });
  } catch (err) {
    console.error("Erro deletar offer:", err);
    res.status(500).json({ error: err.message || err });
  }
});

export default router;
