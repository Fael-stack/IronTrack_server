// back_gui/routes/authMe.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Aluno from '../conexao/Aluno/AlunoSchema.js';
import Treinador from '../conexao/Treinador/TreinadorSchema.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'troque_essa_chave_em_producao';
const JWT_EXPIRES = '7d';

function makeAuthResponse(userDoc, role) {
  const payload = { id: String(userDoc._id), role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  const user = userDoc.toObject ? userDoc.toObject() : { ...userDoc };
  delete user.hashedPassword;
  delete user.password;
  return { token, user, role };
}

router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email e senha são obrigatórios' });

    const tryAluno = async () => {
      const a = await Aluno.findOne({ email: String(email).toLowerCase() });
      if (!a) return null;
      const ok = await bcrypt.compare(String(password), a.hashedPassword || a.password || '');
      if (!ok) return { error: 'Credenciais inválidas', status: 401 };
      return makeAuthResponse(a, 'Aluno');
    };

    const tryTreinador = async () => {
      const t = await Treinador.findOne({ email: String(email).toLowerCase() });
      if (!t) return null;
      const ok = await bcrypt.compare(String(password), t.hashedPassword || t.password || '');
      if (!ok) return { error: 'Credenciais inválidas', status: 401 };
      return makeAuthResponse(t, 'Treinador');
    };

    if (role && (role.toLowerCase() === 'aluno' || role.toLowerCase() === 'treinador')) {
      if (role.toLowerCase() === 'aluno') {
        const out = await tryAluno();
        if (!out) return res.status(401).json({ error: 'Credenciais inválidas' });
        if (out.error) return res.status(out.status || 401).json({ error: out.error });
        return res.json(out);
      } else {
        const out = await tryTreinador();
        if (!out) return res.status(401).json({ error: 'Credenciais inválidas' });
        if (out.error) return res.status(out.status || 401).json({ error: out.error });
        return res.json(out);
      }
    }

    const outAluno = await tryAluno();
    if (outAluno && !outAluno.error) return res.json(outAluno);
    if (outAluno && outAluno.error) return res.status(outAluno.status || 401).json({ error: outAluno.error });

    const outTreinador = await tryTreinador();
    if (outTreinador && !outTreinador.error) return res.json(outTreinador);
    if (outTreinador && outTreinador.error) return res.status(outTreinador.status || 401).json({ error: outTreinador.error });

    return res.status(401).json({ error: 'Credenciais inválidas' });
  } catch (err) {
    console.error('Erro /auth/login:', err);
    return res.status(500).json({ error: 'Erro interno ao autenticar' });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const { id, role } = req.user || {};

    if (!id) return res.status(401).json({ error: 'Token inválido' });

    if (role === 'Aluno' || role === 'aluno') {
      const aluno = await Aluno.findById(id).select('-hashedPassword');
      if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
      return res.json({ role: 'aluno', user: aluno });
    }

    if (role === 'Treinador' || role === 'treinador') {
      const treinador = await Treinador.findById(id).select('-hashedPassword');
      if (!treinador) return res.status(404).json({ error: 'Treinador não encontrado' });
      return res.json({ role: 'treinador', user: treinador });
    }

    return res.status(400).json({ error: 'Role inválida' });
  } catch (err) {
    console.error('Erro /auth/me:', err);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

export default router;
