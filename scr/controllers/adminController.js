const fs = require('fs');
const path = require('path');
const { validateCreatePage } = require('../../utils/validation');
const database = require('../../utils/database');

// Function to render the ADMIN page
const renderAdminPage = (req, res) => {
    const isLoggedIn = req.session.isAdmin;
    const isAdmin = req.session.isAdmin || false;
    res.render("admin", { isLoggedIn, isAdmin });
};

// Function to show all available pages 
const getAllPages = (req, res) => {
    const pages = database.getAllPages();
    res.json(pages);
};

// Function to show the page creation form
const showCreatePageForm = (req, res) => {
    res.render("createNewPage");
};

// Function to create a new page
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
