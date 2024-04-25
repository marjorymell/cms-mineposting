const express = require('express');
const router = express.Router();
const { checksAdmin, checksUser } = require('../../utils/validation');

// Render index page with information about login status
router.get("/", (req, res) => {
    const isLoggedIn = req.session.isLoggedIn || req.session.isAdmin;
    const isAdmin = req.session.isAdmin || false; 
    res.render("index", { isLoggedIn, isAdmin });
});

// Render login page, redirect to home if already logged in
router.get("/login", (req, res) => {
    // Check if the user is already logged in
    if (req.session.isLoggedIn || req.session.isAdmin) {
        return res.redirect("/"); 
    }
    res.render("login");
});

// Handle login form submission
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Check if user is an admin
    if (checksAdmin(email, password)) {
        req.session.isAdmin = true;
        res.redirect("/admin");
    // Check if user is a regular user
    } else if (checksUser(email, password)) {
        req.session.isLoggedIn = true;
        res.redirect("/");
     // If credentials are invalid, return 401 Unauthorized
    } else {
        res.status(401).send("Credenciais inválidas");
    }
});

// Handle logout request
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;
