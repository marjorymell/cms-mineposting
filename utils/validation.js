const { body } = require('express-validator');

exports.loginValidationRules = () => {
  return [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 })
  ];
};

exports.adminCredentials = {
  email: process.env.ADMIN,
  password: process.env.PASSWORD
};