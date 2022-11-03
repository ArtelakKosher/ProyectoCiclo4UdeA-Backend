const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const productModel = require("../models/products");
const ErrorHandler = require("../utils/errorHandler");
const fetch = (url) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url));

// Create product /api/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = new productModel(req.body);

  if (req.file) {
    const { filename } = req.file;
    product.setImgUrl(filename);
  }

  await product.save();

  res.status(201).json({
    success: true,
    product,
  });
});

//Ver la lista de productos
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await productModel.find();

  if (!products) {
    return next(new ErrorHandler("Informacion no encontrada", 404));
  }

  res.status(200).json({
    success: true,
    cantidad: products.length,
    products,
  });
});

// Ver un producto por Id
exports.getProductById = catchAsyncErrors(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Producto no encontrado", 404));
  } else {
    res.status(200).json({
      success: true,
      message: "Aquí encuentras la información de tu producto",
      product,
    });
  }
});

//Update producto
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await productModel.findById(req.params.id); //Variable de tipo modificable

  if (!product) {
    return next(new ErrorHandler("Producto no encontrado", 404));
  }

  product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Producto actualizado corectamente",
    product,
  });
});

//Eliminar un producto
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await productModel.findById(req.params.id); //Variable de tipo modificable

  if (!product) {
    return next(new ErrorHandler("Producto no encontrado", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Producto eliminado correctamente",
  });
});

//HABLEMOS DE FETCH
//Ver todos los productos
function verProductos() {
  fetch("http://localhost:4000/api/products")
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

//verProductos(); //LLamamos al metodo creado para probar la consulta

//Ver por id
function verProductoPorID(id) {
  fetch("http://localhost:4000/api/product/" + id)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

//verProductoPorID('63456a8d9163cb9dbbcaa235'); // Probamos el metodo con un id
