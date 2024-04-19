const express = require('express')
const router = express.Router()

// Default
router.get("/", (req, res) => {
    console.log("Acessou a rota '/'");
    res.render("index");
});

//Login
router.get("/login", (req, res) => {
    console.log("Acessou a rota '/login'");
    res.render("login");
});

//Logout
router.get("/logout", (req, res) => {
    console.log("Acessou a rota '/logout");
    res.render("index");
});

module.exports = router