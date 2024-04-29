const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');

router.get("/", defaultController.renderIndexPage);                   // Route for rendering the main page
router.get("/login", defaultController.renderLoginPage);              // Route for rendering the login page
router.post("/login", defaultController.handleLoginFormSubmission);   // Route for handling the login form submission 
router.get("/logout", defaultController.handleLogoutRequest);         // Route for handling a logout request
router.get("/posts/:title", defaultController.renderPageByTitle);     // Route for rendering a specific page

module.exports = router;
