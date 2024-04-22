const express = require('express');
const router = express.Router();
const { checksAdmin, checksUser } = require('../../utils/validation');


router.get("/", (req, res) => {
    console.log("Acessou a rota '/'");
    res.render("index");
});


router.get("/login", (req, res) => {
    console.log("Acessou a rota '/login'");
    res.render("login");
});


router.post("/login", (req, res) => {
    console.log("Acessou a rota '/login'");
    const { email, password } = req.body;

    // Verificar se é um administrador
    if (checksAdmin(email, password)) {
        // Se for um administrador, faça algo (por exemplo, redirecione para uma página de administração)
        res.redirect("/");
    } else if (checksUser(email, password)) {
        // Se for um usuário comum, faça algo (por exemplo, redirecione para a página de perfil do usuário)
        res.redirect("/");
    } else {
        res.status(401).send("Credenciais inválidas");
    }
});


router.get("/logout", (req, res) => {
    console.log("Acessou a rota '/logout'");
    res.render("index");
});

module.exports = router;
