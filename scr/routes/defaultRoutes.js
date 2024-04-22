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
    const { email, password } = req.body;

    if (checksAdmin(email, password)) {
        req.session.isAdmin = true;
        res.redirect("/");
    } else if (checksUser(email, password)) {
        req.session.isLoggedIn = true;
        res.redirect("/");
    } else {
        res.status(401).send("Credenciais inválidas");
    }
});

router.get("/logout", (req, res) => {
    // Destrua a sessão ao fazer logout
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;
