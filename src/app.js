const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/errors");

app.use(express.json());

//Importar rutas
const products = require("./routes/products.js");

// Middleware
app.use("/api", products); //Sujeto a decision (ruta del navegador)

// Middleware para manejar errores
app.use(errorMiddleware);

module.exports = app;
