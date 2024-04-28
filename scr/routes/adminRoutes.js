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
router.get("/admin/posts", isAdmin, adminController.getAllPages);                // Rota para renderizar os posts
router.get("/admin/posts/create", isAdmin, adminController.showCreatePageForm);  // Rota para renderizar a página de criação de nova página
router.post("/admin/posts/create", isAdmin, adminController.createPage);        // Rota para criar uma nova página

module.exports = router;
