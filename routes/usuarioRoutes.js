const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas para usuários
router.post('/usuarios', usuarioController.criarUsuario);
router.post('/usuarios/admin', authMiddleware, usuarioController.criarAdministrador);
router.get('/usuarios', authMiddleware, usuarioController.listarUsuarios);
router.get('/usuarios/:id', authMiddleware, usuarioController.obterDetalhesUsuario);
router.delete('/usuarios/:id', authMiddleware, usuarioController.excluirUsuario);
router.put('/usuarios/:id', authMiddleware, usuarioController.alterarDadosUsuario);
router.post('/login', usuarioController.login);

module.exports = router;
