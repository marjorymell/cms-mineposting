const fs = require('fs');
const path = require('path');
const { validateCreatePage, validateNamePage } = require('../../utils/validation');
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
    const { title, content } = req.body;
    const { error: validationError } = validateCreatePage(req.body);
    if (validationError) {
        return res.status(400).send(validationError.details[0].message);
    }
    const { error: titleError } = validateNamePage(title);
    if (titleError) {
        return res.status(400).send(titleError.details[0].message);
    }

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
    const pageId = parseInt(req.params.id, 10);
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

    // Content validation
    if (!content) {
        return res.status(400).send("O conteúdo não pode ser vazio.");
    }

    const page = database.getPageById(pageId);
    if (!page) {
        return res.status(404).send("Página não encontrada.");
    }

    // Update the page in the database
    const updatedPage = database.updatePage(pageId, undefined, content);
    if (!updatedPage) {
        return res.status(500).send("Erro ao atualizar a página.");
    }

    // update the corresponding .html file
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
    const pageId = parseInt(req.params.id, 10);
    const page = database.getPageById(pageId);

    if (!page) {
        return res.status(404).send("Página não encontrada.");
    }

    res.render("deletePage", { page });
};


// Function to delete a page'
const deletePage = (req, res) => {
    const pageId = parseInt(req.params.id, 10);

    const page = database.getPageById(pageId);
    if (!page) {
        return res.status(404).send("Página não encontrada.");
    }

    // Delete the page from the database
    const deletedPage = database.deletePage(pageId);
    if (!deletedPage) {
        return res.status(500).send("Erro ao excluir a página do banco de dados.");
    }

    // Delete the corresponding .html file
    const pageFilePath = path.join(__dirname, '..', '..', 'views', 'pages', `${page.title}.html`);
    fs.unlink(pageFilePath, (err) => {
        if (err) {
            console.error("Erro ao excluir o arquivo .html:", err);
            return res.status(500).send("Erro interno do servidor.");
        }

        console.log("Arquivo página excluído com sucesso!");
        // Redirect to the home page after successful deletion
        res.redirect('/');
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