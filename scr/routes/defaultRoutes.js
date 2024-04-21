const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
    console.log("Acessou a rota '/'");
    res.render("login");
});


router.get("/login", (req, res) => {
    console.log("Acessou a rota '/login'");
    res.render("login");
});


router.post("/login", (req, res) => {
    console.log("Acessou a rota '/login'");
    res.render("login");
});


router.get("/logout", (req, res) => {
    console.log("Acessou a rota '/logout'");
    res.render("index");
});

module.exports = router;
