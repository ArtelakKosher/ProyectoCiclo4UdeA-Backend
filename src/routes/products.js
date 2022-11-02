const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/productsController"); //Traemos la respuesta json desde el controlador
const { isUserAuthenticated, authorizeRoles } = require("../middleware/auth");

router.route("/product/new").post(newProduct); //establecemos la ruta
router.route("/products").get(isUserAuthenticated, authorizeRoles("user"), getProducts); //Establecemos desde que ruta queremos ver el getProducts
router.route("/product/:id").get(getProductById); //Ruta para consulta por Id
router
  .route("/product/:id")
  .patch(isUserAuthenticated, authorizeRoles("admin"), updateProduct); //Ruta para actualizar producto
router
  .route("/product/:id")
  .delete(isUserAuthenticated, authorizeRoles("admin"), deleteProduct); //Ruta para eliminar producto

module.exports = router;
