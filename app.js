//Requires gerais
const path = require("path")
const cookieParser = require("cookie-parser")
const express = require('express')
const session = require("express-session")
require("dotenv").config({ path: "./config/.env" });

const app = express()

//Express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

//Template
var mustacheExpress = require("mustache-express");
var engine = mustacheExpress()
app.engine("mustache", engine);
app.set("views", path.join(__dirname, "views", "default"));
app.set("view engine", "mustache");

//Cookies
app.use(cookieParser())

//Sessão
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

//Routes
app.use("/", require('./scr/routes/defaultRoutes'))

app.listen(process.env.PORT, () => {
    console.log("Running...")
})