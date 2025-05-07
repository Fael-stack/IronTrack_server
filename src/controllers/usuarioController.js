import Usuario from "../models/Usuario.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

const createUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const senhaHash = await hashPassword(senha);
    const usuario = await Usuario.create({ nome, email, senha: senhaHash });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario)
      return res.status(400).json({ msg: "Usuário não encontrado" });

    const senhaCorreta = await comparePassword(senha, usuario.senha);
    if (!senhaCorreta) return res.status(401).json({ msg: "Senha incorreta" });

    const token = generateToken({ id: usuario._id, email: usuario.email });
    res.json({ token, usuario: { id: usuario._id, nome: usuario.nome } });
  } catch (err) {
    res.status(500).json({ msg: "Erro no login", error: err.message });
  }
};

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario)
      return res.status(404).json({ error: "Usuário não encontrado" });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!usuario)
      return res.status(404).json({ error: "Usuário não encontrado" });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario)
      return res.status(404).json({ error: "Usuário não encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createUsuario,
  loginUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
};
