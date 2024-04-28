const fs = require('fs');
const path = require('path');
const { validateCreatePage } = require('../../utils/validation');
const database = require('../../utils/database');

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

// Função para criar uma nova página
const createPage = (req, res) => {
    const { error } = validateCreatePage(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { title, content } = req.body;
    const pageFilePath = path.join(__dirname, '..', '..', 'views', 'pages', `${title}.html`);

    fs.writeFile(pageFilePath, content, (err) => {
        if (err) {
            console.error("Erro ao criar arquivo .html:", err);
            return res.status(500).send("Erro interno do servidor.");
        }

        console.log("Arquivo página criada com sucesso!");
        const newPage = database.createPage(title, content);
        if (!newPage) {
            return res.status(500).send("Erro ao criar a página no banco de dados.");
        }
        res.redirect(`/posts/${encodeURIComponent(title)}`);
    });
};



module.exports = {
    renderAdminPage,
    getAllPages,
    showCreatePageForm,
    createPage
};
