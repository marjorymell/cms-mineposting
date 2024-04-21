const { body } = require('express-validator')
require('dotenv').config()

// Regras de validação para o login do administrador
exports.adminLoginValidationRules = () => {
    return [
        body('email').equals(process.env.ADMIN),
        body('password').equals(process.env.ADMINPASSWORD)
    ]
}

// Regras de validação para o login do usuário
exports.userLoginValidationRules = () => {
    return [
        body('email').equals(process.env.USER),
        body('password').equals(process.env.USERPASSWORD)
    ]
}
