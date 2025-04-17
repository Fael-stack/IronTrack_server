const Usuario = require('../models/Usuario');

exports.getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

exports.criarUsuario = async (req, res) => {
  const novo = new Usuario(req.body);
  await novo.save();
  res.status(201).json(novo);
};