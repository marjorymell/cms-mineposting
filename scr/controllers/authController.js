const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    console.log("Acessou a rota '/'");
    res.render("index");
});

module.exports = router