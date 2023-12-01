const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

const usuarioController = {
  criarUsuario: async (req, res) => {
    try {
      const { nome, email, senha } = req.body;

      // Verifica se o usuário já existe
      const usuarioExistente = await Usuario.findOne({ email });

      if (usuarioExistente) {
        return res.status(400).json({ error: 'Usuário já cadastrado com este email' });
      }

      // Hash da senha
      const hashedSenha = await bcrypt.hash(senha, 10);

      // Cria um novo usuário
      const novoUsuario = await Usuario.create({
        nome,
        email,
        senha: hashedSenha,
      });

      res.status(201).json(novoUsuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar o usuário' });
    }
  },

  criarAdministrador: async (req, res) => {
    try {
      // Certifica-se de que o usuário que faz a solicitação é um administrador
      if (!req.usuario.admin) {
        return res.status(403).json({ error: 'Acesso não autorizado' });
      }

      const { nome, email, senha } = req.body;

      // Hash da senha
      const hashedSenha = await bcrypt.hash(senha, 10);

      // Cria o novo administrador
      const novoAdministrador = await Usuario.create({
        nome,
        email,
        senha: hashedSenha,
        admin: true,
      });

      res.status(201).json(novoAdministrador);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar administrador' });
    }
  },

  listarUsuarios: async (req, res) => {
    try {
      // Certifica-se de que o usuário que faz a solicitação é um administrador
      if (!req.usuario.admin) {
        return res.status(403).json({ error: 'Acesso não autorizado' });
      }

      const usuarios = await Usuario.find();
      res.status(200).json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  },

  obterDetalhesUsuario: async (req, res) => {
    try {
      const { id } = req.params;

      // Certifica-se de que o usuário que faz a solicitação é o próprio usuário ou um administrador
      if (!req.usuario.admin && req.usuario.id !== id) {
        return res.status(403).json({ error: 'Acesso não autorizado' });
      }

      const usuario = await Usuario.findById(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.status(200).json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter detalhes do usuário' });
    }
  },

  excluirUsuario: async (req, res) => {
    try {
      const { id } = req.params;

      // Certifica-se de que o usuário que faz a solicitação é um administrador
      if (!req.usuario.admin) {
        return res.status(403).json({ error: 'Acesso não autorizado' });
      }
      console.log(req.usuario);
      const usuarioExcluido = await Usuario.findByIdAndDelete(id);
      console.log("teste");
      if (!usuarioExcluido) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir o usuário' });
    }
  },

  alterarDadosUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, email } = req.body;

      // Certifica-se de que o usuário que faz a solicitação é o próprio usuário ou um administrador
      if (!req.usuario.admin && req.usuario.id !== id) {
        return res.status(403).json({ error: 'Acesso não autorizado' });
      }

      // Atualiza os dados do usuário
      const usuarioAtualizado = await Usuario.findByIdAndUpdate(
        id,
        { nome, email },
        { new: true } // Retorna o usuário atualizado
      );

      if (!usuarioAtualizado) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.status(200).json(usuarioAtualizado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao alterar dados do usuário' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      // Verifica se o usuário existe
      const usuario = await Usuario.findOne({ email });

      if (!usuario) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Verifica a senha
      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

      if (!senhaCorreta) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Gerando o token JWT
      const token = jwt.sign(
        {
          id: usuario._id,
          email: usuario.email,
          admin: usuario.admin,
        },
        '123@321', // chave secreta
        { expiresIn: '1h' } // Tempo de expiração do token
      );

      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao realizar login' });
    }
  },
};

module.exports = usuarioController;
