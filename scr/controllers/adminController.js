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

// Function to show the edit page form
const showEditPageForm = (req, res) => {
    const pageId = parseInt(req.params.id, 10); // ID da página para edição
    const page = database.getPageById(pageId);

    if (!page) {
        return res.status(404).send("Página não encontrada.");
    }

    res.render("editPage", { page });
};


// Function to update a page
const updatePage = (req, res) => {
    const pageId = parseInt(req.params.id, 10);
    const { content } = req.body;

    // Validação do conteúdo (pode ser mais complexa dependendo dos requisitos)
    if (!content) {
        return res.status(400).send("O conteúdo não pode ser vazio.");
    }

    const page = database.getPageById(pageId);
    if (!page) {
        return res.status(404).send("Página não encontrada.");
    }

    // Atualiza o conteúdo da página no "banco de dados"
    const updatedPage = database.updatePage(pageId, undefined, content);
    if (!updatedPage) {
        return res.status(500).send("Erro ao atualizar a página.");
    }

    // Atualiza o arquivo .html correspondente
    const pageFilePath = path.join(__dirname, '..', '..', 'views', 'pages', `${page.title}.html`);
    fs.writeFile(pageFilePath, content, (err) => {
        if (err) {
            console.error("Erro ao atualizar o arquivo .html:", err);
            return res.status(500).send("Erro interno do servidor.");
        }

        console.log("Arquivo página atualizado com sucesso!");
        res.redirect(`/posts/${encodeURIComponent(page.title)}`);
    });
};

//Function to show the delete page form
const showDeletePageForm = (req, res) => {
    const pageId = parseInt(req.params.id, 10); // ID da página para exclusão
    const page = database.getPageById(pageId);

    if (!page) {
        return res.status(404).send("Página não encontrada.");
    }

    res.render("deletePage", { page });
};


// Function to delete a page'
const deletePage = (req, res) => {
    const pageId = parseInt(req.params.id, 10); // ID da página para exclusão

    const page = database.getPageById(pageId);
    if (!page) {
        return res.status(404).send("Página não encontrada.");
    }

    // Excluir a página do "banco de dados"
    const deletedPage = database.deletePage(pageId);
    if (!deletedPage) {
        return res.status(500).send("Erro ao excluir a página do banco de dados.");
    }

    // Excluir o arquivo .html correspondente
    const pageFilePath = path.join(__dirname, '..', '..', 'views', 'pages', `${page.title}.html`);
    fs.unlink(pageFilePath, (err) => {
        if (err) {
            console.error("Erro ao excluir o arquivo .html:", err);
            return res.status(500).send("Erro interno do servidor.");
        }

        console.log("Arquivo página excluído com sucesso!");
        res.status(200).send("Página excluída com sucesso.");
    });
};


module.exports = {
    renderAdminPage,
    getAllPages,
    showCreatePageForm,
    createPage,
    showEditPageForm,
    updatePage,
    showDeletePageForm,
    deletePage
};