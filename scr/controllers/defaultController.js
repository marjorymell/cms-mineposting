const { checksAdmin, checksUser } = require('../../utils/validation')

// Renderiza a página inicial com informações sobre o status de login
const renderIndexPage = (req, res) => {
    const isLoggedIn = req.session.isLoggedIn || req.session.isAdmin;
    const isAdmin = req.session.isAdmin || false;
    res.render("index", { isLoggedIn, isAdmin });
};

// Renderiza a página de login, redireciona para a página inicial se já estiver logado
const renderLoginPage = (req, res) => {
    // Verifica se o usuário já está logado
    if (req.session.isLoggedIn || req.session.isAdmin) {
        return res.redirect("/");
    }
    res.render("login");
};

// Lida com o envio do formulário de login
const handleLoginFormSubmission = (req, res) => {
    const { email, password } = req.body;

    // Verifica se o usuário é um admin
    if (checksAdmin(email, password)) {
        req.session.isAdmin = true;
        res.redirect("/admin");
    // Verifica se o usuário é um usuário regular
    } else if (checksUser(email, password)) {
        req.session.isLoggedIn = true;
        res.redirect("/");
    // Se as credenciais forem inválidas, retorna 401 Unauthorized
    } else {
        res.status(401).send("Credenciais inválidas");
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
    handleLogoutRequest
};
