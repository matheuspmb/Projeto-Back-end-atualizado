const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Obtem o token do cabeçalho da solicitação
  const token = req.header('Authorization');

  // Verifica se o token está presente
  if (!token) {
    return res.status(401).json({ error: 'Acesso não autorizado. Token não fornecido.' });
  }

  try {
    // Verifica se o token é válido
    const decoded = jwt.verify(token, '123@321'); // chave secreta

    // Anexa as informações do usuário ao objeto de solicitação
    req.usuario = decoded;

    // Continua para a próxima função de middleware ou rota
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = authMiddleware;
