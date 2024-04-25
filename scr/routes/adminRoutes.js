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

// Rotas
router.get("/admin", isAdmin, adminController.renderAdminPage);
router.get("/posts", isAdmin, adminController.getAllPages);
router.get("/posts/create", isAdmin, adminController.showCreatePageForm);
router.post("/posts/create", isAdmin, adminController.createPage);

module.exports = router;
