const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');

router.get("/", defaultController.renderIndexPage);                   // Rota para renderizar a página inicial
router.get("/login", defaultController.renderLoginPage);              // Rota para renderizar a página de login
router.post("/login", defaultController.handleLoginFormSubmission);   // Rota para lidar com o envio do formulário de login
router.get("/logout", defaultController.handleLogoutRequest);         // Rota para lidar com o pedido de logout

module.exports = router;
