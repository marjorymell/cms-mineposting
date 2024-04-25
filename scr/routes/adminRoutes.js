const express = require('express')
const router = express.Router()


// Route for accessing the admin dashboard
router.get("/admin", (req, res) => {
    const isLoggedIn = req.session.isLoggedIn || req.session.isAdmin;
    const isAdmin = req.session.isAdmin || false; 
    res.render("admin", { isLoggedIn, isAdmin })
});

// Route for accessing the posts page
router.get("/posts", (req, res) => {
    console.log("Acessou a rota '/posts'");
});

// Route for accessing the page to create a new post
router.get("/posts/create", (req, res) => {
    console.log("Acessou a rota '/posts/create'");
});

// Route for accessing the page to edit a post by ID
router.get("/posts/edit/:id", (req, res) => {
    console.log("Acessou a rota '/posts/create'");
});

// Route for accessing the page to delete a post by ID
router.get("/posts/delete/:id", (req, res) => {
    console.log("Acessou a rota '/posts/create'");
});


module.exports = router

