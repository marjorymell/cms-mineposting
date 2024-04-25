//Requires
const path = require("path")
const cookieParser = require("cookie-parser")
const express = require('express')
const session = require("express-session")
var mustacheExpress = require("mustache-express")
require("dotenv").config({ path: "./config/.env" });

const app = express()

//Express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

//Template
var mustacheExpress = require("mustache-express")
var engine = mustacheExpress()
app.engine("mustache", engine);
app.set('views', [
    path.join(__dirname, 'views', 'default'),
    path.join(__dirname, 'views', 'admin')
]);
app.set("view engine", "mustache");

//Cookies
app.use(cookieParser())

//Session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

//Routes
app.use("/", require('./scr/routes/defaultRoutes'))
app.use("/", require('./scr/routes/adminRoutes'))

app.listen(process.env.PORT, () => {
    console.log("Running...")
})