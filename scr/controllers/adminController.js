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

// Função para criar uma nova página
const createPage = (req, res) => {
    const { error } = validateCreatePage(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { title, content } = req.body;

    const templatePath = path.join(__dirname, '..', '..', 'views', 'pages', 'templatePages.mustache');
    const pageFilePath = path.join(__dirname, '..', '..', 'views', 'pages', `${title}.mustache`);

    fs.readFile(templatePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Erro ao ler o arquivo de template:", err);
            return res.status(500).send("Erro interno do servidor.");
        }

        const pageContent = data.replace('{{title}}', title).replace('{{content}}', content);

        fs.writeFile(pageFilePath, pageContent, (err) => {
            if (err) {
                console.error("Erro ao criar arquivo .mustache:", err);
                return res.status(500).send("Erro interno do servidor.");
            }
            console.log("Arquivo página criada com sucesso!");

            // Após criar o arquivo, salve a página no banco de dados
            const newPage = database.createPage(title, content);
            if (!newPage) {
                return res.status(500).send("Erro ao criar a página.");
            }

            res.redirect(`/posts/${encodeURIComponent(title)}`);
        });
    });
};

// Função para renderizar uma página específica
const renderPage = (req, res) => {
    const isLoggedIn = req.session.isLoggedIn || req.session.isAdmin;
    const isAdmin = req.session.isAdmin || false;
    const pageTitle = req.params.pageTitle; // Captura o título da página da URL
    const page = database.getPageByTitle(pageTitle); // Busca a página pelo título no banco de dados

    if (!page) {
        return res.status(404).send("Página não encontrada.");
    }

    // Renderiza a página encontrada usando o modelo correspondente ao nome da página
    res.render(pageTitle, { page, isLoggedIn, isAdmin });
};


module.exports = {
    renderAdminPage,
    getAllPages,
    showCreatePageForm,
    createPage,
    renderPage 
};
