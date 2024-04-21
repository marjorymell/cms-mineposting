const { body, validationResult } = require('express-validator');

// Conjunto de regras de validação para o formulário de login
exports.validateLogin = [
  body('email', 'O e-mail é obrigatório').trim().isEmail(),
  body('password', 'A senha é obrigatória e deve ter no mínimo 6 caracteres').trim().isLength({ min: 6 }),
];

// Validção do admin
exports.adminCredentials = {
  email: process.env.ADMIN,
  password: process.env.PASSWORD
};

// Middleware para processar os resultados da validação
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
