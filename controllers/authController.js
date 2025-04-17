// controllers/authController.js
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { SignJWT } = require('jose'); // importando jose no CommonJS

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'seuSegredoSeguro');

function gerarToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);
}

exports.registrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ msg: 'Usuário já existe' });

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const novoUsuario = new Usuario({ nome, email, senha: senhaHash });
    await novoUsuario.save();

    const token = await gerarToken({ id: novoUsuario._id, email });

    res.status(201).json({ token, usuario: { nome, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao registrar usuário' });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ msg: 'Credenciais inválidas' });

    const isMatch = await bcrypt.compare(senha, usuario.senha);
    if (!isMatch) return res.status(400).json({ msg: 'Credenciais inválidas' });

    const token = await gerarToken({ id: usuario._id, email });

    res.json({ token, usuario: { nome: usuario.nome, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao fazer login' });
  }
};
