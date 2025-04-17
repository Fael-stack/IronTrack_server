const express = require('express');
const router = express.Router();
const { getUsuarios, criarUsuario } = require('../controllers/usuarioController');

router.get('/', getUsuarios);
router.post('/', criarUsuario);

module.exports = router;