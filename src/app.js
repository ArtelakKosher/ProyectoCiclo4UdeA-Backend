const express = require("express");
const cors = require("cors");
const app = express();
const errorMiddleware = require("./middleware/errors");
const cookieParser = require("cookie-parser");

// eneable bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public/images/products", express.static(`${__dirname}/storage/images`));

app.use(cookieParser());

// enable CORS
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

//Importar rutas
const products = require("./routes/products");
const users = require("./routes/auth");

// Middleware
app.use("/api", products); //Sujeto a decision (ruta del navegador)
app.use("/api", users);

// Middleware para manejar errores
app.use(errorMiddleware);

module.exports = app;
