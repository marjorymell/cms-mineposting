const express = require('express')
const router = express.Router()
const { validateLogin, handleValidationErrors } = require('../../utils/validation')

// Default
router.get("/", (req, res) => {
    console.log("Acessou a rota '/'")
    res.render("index");
});

//Login
router.get("/login", (req, res) => {
    console.log("Acessou a rota '/login'")
    res.render("login")
});

router.post("/login", validateLogin, handleValidationErrors, (req, res) => {
    const { email, password } = req.body
    res.status(400).render('login', { errors: req.validationErrors() })
  });
  

//Logout
router.get("/logout", (req, res) => {
    console.log("Acessou a rota '/logout")
    res.render("index")
});

module.exports = router