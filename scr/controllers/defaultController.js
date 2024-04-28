const { checksAdmin, checksUser } = require('../../utils/validation')
const database = require('../../utils/database');

// Renderiza a página inicial com informações sobre o status de login
const renderIndexPage = (req, res) => {
    const isLoggedIn = req.session.isLoggedIn || req.session.isAdmin;
    const isAdmin = req.session.isAdmin || false;
    res.render("index", { isLoggedIn, isAdmin });
};

// Renderiza a página de login, redireciona para a página inicial se já estiver logado
const renderLoginPage = (req, res) => {
    if (req.session.isLoggedIn || req.session.isAdmin) {
        return res.redirect("/");
    }
    res.render("login");
};

// Renderiza uma página com base no título fornecido
const renderPageByTitle = (req, res) => {
    const isLoggedIn = req.session.isLoggedIn || req.session.isAdmin;
    const isAdmin = req.session.isAdmin || false;
    const title = req.params.title;
    const page = database.getPageByTitle(title); 

    if (!page) { 
        return res.status(404).send("Página não encontrada");
    }
    res.render("templatePages", { title, content: page.content, isLoggedIn, isAdmin});
};

// Lida com o envio do formulário de login
const handleLoginFormSubmission = (req, res) => {
    const { email, password } = req.body;
   
    if (checksAdmin(email, password)) {
        req.session.isAdmin = true;
        res.redirect("/admin");
    } else if (checksUser(email, password)) {
        req.session.isLoggedIn = true;
        res.redirect("/"); 
    } else {
        res.status(401).send("Credenciais inválidas"); //Melhorar essa parte !!!
    }
};

// Lida com o pedido de logout
const handleLogoutRequest = (req, res) => {
    req.session.destroy();
    res.redirect("/");
};



module.exports = {
    renderIndexPage,
    renderLoginPage,
    handleLoginFormSubmission,
    handleLogoutRequest,
    renderPageByTitle
};
