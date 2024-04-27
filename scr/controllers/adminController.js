const fs = require('fs');
const path = require('path');
const DatabaseMemory = require('../../utils/databaseMemory');
const { validateCreatePage } = require('../../utils/validation');
const { checksAdmin, checksUser } = require('../../utils/validation')

const database = new DatabaseMemory();

// Função para renderizar a página de administração
const renderAdminPage = (req, res) => {
    const isLoggedIn = req.session.isAdmin;
    const isAdmin = req.session.isAdmin || false;
    res.render("admin", { isLoggedIn, isAdmin });
};

// Função para exibir todas as páginas
const getAllPages = (req, res) => {
    const pages = database.getAllPages();
    res.json(pages);
};

// Função para exibir o formulário de criação de nova página
const showCreatePageForm = (req, res) => {
    res.render("createNewPage");
};



module.exports = {
    renderAdminPage,
    getAllPages,
    showCreatePageForm
};
