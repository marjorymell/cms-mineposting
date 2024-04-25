const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');

// Rota para renderizar a página inicial
router.get("/", defaultController.renderIndexPage);

// Rota para renderizar a página de login
router.get("/login", defaultController.renderLoginPage);

// Rota para lidar com o envio do formulário de login
router.post("/login", defaultController.handleLoginFormSubmission);

// Rota para lidar com o pedido de logout
router.get("/logout", defaultController.handleLogoutRequest);

module.exports = router;
