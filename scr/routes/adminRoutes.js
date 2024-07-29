const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Middleware for ADMIN verification
const isAdmin = (req, res, next) => {
    if (req.session.isAdmin) {
        next();
    } else {
        res.status(403).send("Acesso negado. Você não é um administrador.");
    }
};

router.get("/admin", isAdmin, adminController.renderAdminPage);                  // Route for ADMIN page rendering
router.get("/admin/posts", isAdmin, adminController.getAllPages);                // Route for posts rendering
router.get("/admin/posts/create", isAdmin, adminController.showCreatePageForm);  // Route for rendering the page creation page
router.post("/admin/posts/create", isAdmin, adminController.createPage);         // Route for creating a new page
router.get("/admin/posts/edit/:id", isAdmin, adminController.showEditPageForm);  // Route for rendering the edit page form
router.post("/admin/posts/edit/:id", isAdmin, adminController.updatePage);       // Route for processing the edit page form
router.get("/admin/posts/delete/:id", isAdmin, adminController.showDeletePageForm);      // Route for rendering the delete page
router.post("/admin/posts/delete/:id", isAdmin, adminController.deletePage);     // Route for processing the deletion of a page

module.exports = router;
