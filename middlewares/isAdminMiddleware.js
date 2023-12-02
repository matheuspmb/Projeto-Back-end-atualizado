const jwt = require('jsonwebtoken');

const isAdminMiddleware = (req, res, next) => {
  // Verifica se o usuário é um administrador
  if (!req.usuario || !req.usuario.admin) {
    return res.status(403).json({ error: 'Acesso não autorizado. Você não é um administrador.' });
  }
  // Se usuário é um administrador, continua para a próxima função de middleware ou rota
  next();
};

module.exports = isAdminMiddleware;
