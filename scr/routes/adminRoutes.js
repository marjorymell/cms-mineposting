const express = require('express')
const router = express.Router()


router.get("/", (req, res) => {
    console.log("Acessou a rota do admin'/'");

});

router.get("/posts", (req, res) => {
    console.log("Acessou a rota '/posts'");
});

router.get("/posts/create", (req, res) => {
    console.log("Acessou a rota '/posts/create'");
});

router.get("/posts/edit/:id", (req, res) => {
    console.log("Acessou a rota '/posts/create'");
});

router.get("/posts/delete/:id", (req, res) => {
    console.log("Acessou a rota '/posts/create'");
});


module.exports = router

