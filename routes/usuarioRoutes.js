const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middleware/auth');

router.post('/registrar', usuarioController.registrar);
router.post('/login', usuarioController.login);
router.get('/perfil', auth, usuarioController.getPerfil);

module.exports = router;
