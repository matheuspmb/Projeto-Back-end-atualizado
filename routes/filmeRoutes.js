const express = require('express');
const router = express.Router();
const filmeController = require('../controllers/filmeController');

// Rotas para filmes
router.post('/filmes', filmeController.criarFilme);
router.get('/filmes', filmeController.listarFilmes);
router.get('/filmes/:id', filmeController.obterDetalhesFilme);
router.delete('/filmes/:id', filmeController.excluirFilme);

module.exports = router;
