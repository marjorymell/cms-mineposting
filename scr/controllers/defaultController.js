const { checksAdmin, checksUser } = require('../../utils/validation')
const database = require('../../utils/database');

// Function to render the main page w/ dynamic cards
const renderIndexPage = (req, res) => {
    const isLoggedIn = req.session.isLoggedIn || req.session.isAdmin;
    const isAdmin = req.session.isAdmin || false;
    const pages = getAllPages();
    console.log("Páginas:", pages);

    res.render("index", { 
        isLoggedIn, 
        isAdmin, 
        pages     
    });
};

// Renders the login page, and redirects the user to the main page if they've already logged in
const renderLoginPage = (req, res) => {
    if (req.session.isLoggedIn || req.session.isAdmin) {
        return res.redirect("/");
    }
    res.render("login");
};

// Renders a page w/ the given title
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

// Handles the form submission
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

// Handles a logout request
const handleLogoutRequest = (req, res) => {
    req.session.destroy();
    res.redirect("/");
};

// Function to get all available pages
const getAllPages = () => {
    return database.getAllPages();
};


module.exports = {
    renderIndexPage,
    renderLoginPage,
    handleLoginFormSubmission,
    handleLogoutRequest,
    renderPageByTitle
};
