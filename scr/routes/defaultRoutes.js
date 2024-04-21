const express = require('express');
const router = express.Router();


// Rota para renderizar o formulário de login
router.get("/login", (req, res) => {
    console.log("Acessou a rota '/login'");
    res.render("login");
});

// Rota para processar o formulário de login
router.post("/login", (req, res) => {
    console.log("Acessou a rota '/login'");
    res.render("login");
});

// Rota para renderizar o formulário de login
router.get("/logout", (req, res) => {
    console.log("Acessou a rota '/logout'");
    res.render("index");
});

module.exports = router;
