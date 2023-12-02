const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

// Rotas para usuários
router.post('/usuarios', usuarioController.criarUsuario);
router.post('/usuarios/admin', authMiddleware, isAdminMiddleware, usuarioController.criarAdministrador);
router.get('/usuarios', authMiddleware, isAdminMiddleware, usuarioController.listarUsuarios);
router.get('/usuarios/:id', authMiddleware, isAdminMiddleware, usuarioController.obterDetalhesUsuario);
router.delete('/usuarios/:id', authMiddleware, isAdminMiddleware, usuarioController.excluirUsuario);
router.put('/usuarios/:id', authMiddleware, isAdminMiddleware, usuarioController.alterarDadosUsuario);
router.post('/login', usuarioController.login);

module.exports = router;
