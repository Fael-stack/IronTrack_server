// back_gui/middlewares/checkTreinadorContrato.js
import Contract from "../conexao/Contract/ContractSchema.js";


export async function checkTreinadorContrato(req, res, next) {
  try {
    if (!req.user || req.user.role !== "Treinador") {
      return res.status(403).json({ error: "Apenas treinadores podem executar essa ação." });
    }

    const treinadorId = req.user.id;
    const alunoId =
      req.body?.userId ||
      req.params?.userId ||
      req.query?.userId;

    if (!alunoId) {
      return res.status(400).json({ error: "userId (aluno) é obrigatório." });
    }

    const contrato = await Contract.findOne({
      aluno: alunoId,
      treinador: treinadorId,
      status: "ativo",
    });

    if (!contrato) {
      return res.status(403).json({
        error: "Você não possui contrato ativo com este aluno.",
      });
    }
    if (typeof next === "function") {
      return next();
    }
  } catch (err) {
    console.error("Erro no checkTreinadorContrato:", err);
    return res.status(500).json({ error: "Erro interno." });
  }
}
