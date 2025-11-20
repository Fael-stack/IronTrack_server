import Contract from "../conexao/Contract/ContractSchema.js";

// Verifica se o treinador logado possui contrato ativo com o aluno
export async function checkTreinadorContrato(req, res, next) {
  try {
    const treinadorId = req.user.id;

    // ALUNO VEM DE params, body OU query
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

    next();

  } catch (err) {
    console.error("Erro no checkTreinadorContrato:", err);
    return res.status(500).json({ error: "Erro interno." });
  }
}

