const express = require('express');
const router = express.Router();

// Middleware for admin verification
const isAdmin = (req, res, next) => {
    if (req.session.isAdmin) {
        // If the user is an admin, proceed to the next route
        next();
    } else {
        // If not an admin, redirect to an error page or send an error message
        res.status(403).send("Access denied. You are not an admin.");
    }
};

// Route to access the admin dashboard
router.get("/admin", isAdmin, (req, res) => {
    const isLoggedIn = req.session.isAdmin;
    const isAdmin = req.session.isAdmin || false;
    res.render("admin", { isLoggedIn, isAdmin });
});

// Routes related to posts
router.get("/posts", isAdmin, (req, res) => {
    console.log("Accessed the '/posts' route");
});

router.get("/posts/create", isAdmin, (req, res) => {
    res.render("createNewPage")
});

router.get("/posts/edit/:id", isAdmin, (req, res) => {
    console.log("Accessed the '/posts/edit/:id' route");
});

router.get("/posts/delete/:id", isAdmin, (req, res) => {
    console.log("Accessed the '/posts/delete/:id' route");
});

module.exports = router;
