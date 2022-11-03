const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/productsController"); //Traemos la respuesta json desde el controlador
const { isUserAuthenticated, authorizedRoles } = require("../middleware/auth");

router.route("/product/new").post(isUserAuthenticated, authorizedRoles("admin","user"), newProduct); //establecemos la ruta
router.route("/products").get(getProducts); // Establecemos desde que ruta queremos ver el getProducts
router.route("/product/:id").get(getProductById); // Ruta para consulta por Id
router
  .route("/product/:id")
  .patch(isUserAuthenticated, authorizedRoles("admin","user"), updateProduct); //Ruta para actualizar producto
router
  .route("/product/:id")
  .delete(isUserAuthenticated, authorizedRoles("admin","user"), deleteProduct); //Ruta para eliminar producto

module.exports = router;
