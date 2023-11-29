const Filme = require('../models/filme');

const filmeController = {
  criarFilme: async (req, res) => {
    try {
      const novoFilme = await Filme.create(req.body);
      res.status(201).json(novoFilme);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar o filme' });
    }
  },

  listarFilmes: async (req, res) => {
    try {
      const { limite = 10, pagina = 1 } = req.query;
      const filmes = await Filme.find()
        .limit(parseInt(limite))
        .skip((parseInt(pagina) - 1) * parseInt(limite));
      res.status(200).json(filmes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar filmes' });
    }
  },

  obterDetalhesFilme: async (req, res) => {
    try {
      const { id } = req.params;
      const filme = await Filme.findById(id);
      if (!filme) {
        res.status(404).json({ error: 'Filme não encontrado' });
      } else {
        res.status(200).json(filme);
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter detalhes do filme' });
    }
  },

  excluirFilme: async (req, res) => {
    try {
      const { id } = req.params;
      const filmeExcluido = await Filme.findByIdAndDelete(id);

      if (!filmeExcluido) {
        res.status(404).json({ error: 'Filme não encontrado' });
      } else {
        res.status(200).json({ message: 'Filme excluído com sucesso' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir o filme' });
    }
  },
};

module.exports = filmeController;
