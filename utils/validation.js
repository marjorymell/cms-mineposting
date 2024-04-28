const Joi = require('joi');
// Validation schema for form parameters
const createPageSchema = Joi.object({
    title: Joi.string().regex(/^[a-zA-Z0-9]+$/).required(),
    content: Joi.string().required()
});

// Função para validar os parâmetros do formulário de criação de página
function validateCreatePage(data) {
    return createPageSchema.validate(data);
}

// Função para verificar as credenciais do administrador
function checksAdmin(email, password) {
    return email === process.env.ADMIN && password === process.env.ADMINPASSWORD;
}

// Função para verificar as credenciais do usuário
function checksUser(email, password) {
    return email === process.env.USER && password === process.env.USERPASSWORD;
}


module.exports = {
    validateCreatePage,
    checksAdmin,
    checksUser,    
};
