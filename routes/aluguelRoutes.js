const express = require('express');
const router = express.Router();
const aluguelController = require('../controllers/aluguelController');

// Rotas para aluguéis
router.post('/alugueis', aluguelController.criarAluguel);
router.get('/alugueis', aluguelController.listarAlugueis);
router.get('/alugueis/:id', aluguelController.obterDetalhesAluguel);
router.delete('/alugueis/:id', aluguelController.excluirAluguel);

module.exports = router;
