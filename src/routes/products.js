const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/productsController"); //Traemos la respuesta json desde el controlador

router.route("/product/new").post(newProduct); //establecemos la ruta
router.route("/products").get(getProducts); //Establecemos desde que ruta queremos ver el getProducts
router.route("/product/:id").get(getProductById); //Ruta para consulta por Id
router.route("/product/:id").patch(updateProduct); //Ruta para actualizar producto
router.route("/product/:id").delete(deleteProduct); //Ruta para eliminar producto

module.exports = router;
