const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Middleware para verificação de admin
const isAdmin = (req, res, next) => {
    if (req.session.isAdmin) {
        next();
    } else {
        res.status(403).send("Acesso negado. Você não é um administrador.");
    }
};

router.get("/admin", isAdmin, adminController.renderAdminPage);            // Rota para renderizar a página do admin
router.get("/posts", isAdmin, adminController.getAllPages);                // Rota para renderizar os posts
router.get("/posts/create", isAdmin, adminController.showCreatePageForm);  // Rota para renderizar a página de criação de nova página
router.post("/posts/create", isAdmin, adminController.createPage);         // Rota para lidar com o envio do formulário da nova página
router.get("/posts/:title", isAdmin, adminController.renderPage);  // Rota para renderizar a página de criação de nova página

module.exports = router;
