const Aluguel = require('../models/aluguel');

const aluguelController = {
  criarAluguel: async (req, res) => {
    try {
      const novoAluguel = await Aluguel.create(req.body);
      res.status(201).json(novoAluguel);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar o aluguel' });
    }
  },

  listarAlugueis: async (req, res) => {
    try {
      const { limite = 10, pagina = 1 } = req.query;
      const alugueis = await Aluguel.find()
        .limit(parseInt(limite))
        .skip((parseInt(pagina) - 1) * parseInt(limite));
      res.status(200).json(alugueis);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar alugueis' });
    }
  },

  obterDetalhesAluguel: async (req, res) => {
    try {
      const { id } = req.params;
      const aluguel = await Aluguel.findById(id);
      if (!aluguel) {
        res.status(404).json({ error: 'Aluguel não encontrado' });
      } else {
        res.status(200).json(aluguel);
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter detalhes do aluguel' });
    }
  },

  excluirAluguel: async (req, res) => {
    try {
      const { id } = req.params;
      const aluguelExcluido = await Aluguel.findByIdAndRemove(id);

      if (!aluguelExcluido) {
        res.status(404).json({ error: 'Aluguel não encontrado' });
      } else {
        res.status(200).json({ message: 'Aluguel excluído com sucesso' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir o aluguel' });
    }
  },
};

module.exports = aluguelController;
