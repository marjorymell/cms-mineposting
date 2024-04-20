const express = require('express')
const router = express.Router()

const Acesso = require('../controls/usuario')

router.get("/criar", (req, res) => {

    return res.send(`Teste criar`);

})

router.get("/editar", (req, res) => {

    return res.send(`Teste editar`);

})

router.get("/deletar", (req, res) => {

    return res.send(`Teste detele`);

})





module.exports = router

