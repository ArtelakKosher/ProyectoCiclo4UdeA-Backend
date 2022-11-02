const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const errorMiddleware = require("./middleware/errors");
const cookieParser = require("cookie-parser");

// eneable bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// enable CORS
app.use(cors());

//Importar rutas
const products = require("./routes/products");
const users = require("./routes/auth");

// Middleware
app.use("/api", products); //Sujeto a decision (ruta del navegador)
app.use("/api", users);

// Middleware para manejar errores
app.use(errorMiddleware);

module.exports = app;
