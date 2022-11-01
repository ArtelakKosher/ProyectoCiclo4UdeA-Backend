const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const errorMiddleware = require("./middleware/errors");

// eneable bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS
app.use(cors());

//Importar rutas
const products = require("./routes/products.js");

// Middleware
app.use("/api", products); //Sujeto a decision (ruta del navegador)

// Middleware para manejar errores
app.use(errorMiddleware);

module.exports = app;
