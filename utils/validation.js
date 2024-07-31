const Joi = require('joi');
const database = require('../utils/database');

// Validation schema for form parameters
const createPageSchema = Joi.object({
    title: Joi.string().regex(/^[a-zA-Z0-9]+$/).required(),
    content: Joi.string().required()
});

// Function to validate the parameters of the page creation form
function validateCreatePage(data) {
    return createPageSchema.validate(data);
}

// Function to check ADMIN information
function checksAdmin(email, password) {
    return email === process.env.ADMIN && password === process.env.ADMINPASSWORD;
}

// Function to check USER information
function checksUser(email, password) {
    return email === process.env.USER && password === process.env.USERPASSWORD;
}

function validateNamePage(title) {
    const existingPage = database.getPageByTitle(title);
    if (existingPage) {
        return { error: { details: [{ message: "O título da página já está em uso." }] } };
    }
    return { error: null };
}
module.exports = {
    validateCreatePage,
    checksAdmin,
    checksUser,
    validateNamePage,
};
