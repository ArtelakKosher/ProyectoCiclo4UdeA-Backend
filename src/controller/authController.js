const User = require("../models/auth");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const tokenSubmitted = require("../utils/jwtToken");

//Registrar un nuevo usuario /api/user/register
exports.userRegistration = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "ANd9GcQKZwmqodcPdQUDRt6E5cPERZDWaqy6ITohlQ&usqp",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKZwmqodcPdQUDRt6E5cPERZDWaqy6ITohlQ&usqp=CAU",
    },
  });
  tokenSubmitted(user, 201, res);
});

//Iniciar Sesion - Login
exports.userLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //revisar si los campos estan completos
  if (!email || !password) {
    return next(new ErrorHandler("Por favor ingrese email y contraseña", 400));
  }

  //Buscar al usuario en nuestra base de datos
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Email o contraseña invalidos", 401));
  }

  //Comparar contraseñas, verificar si está bien
  const passwordOK = await user.comparePassword(password);

  if (!passwordOK) {
    return next(new ErrorHandler("Contraseña invalida", 401));
  }

  tokenSubmitted(user, 200, res);
});
