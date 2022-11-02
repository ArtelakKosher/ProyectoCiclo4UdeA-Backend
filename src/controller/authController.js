const User = require("../models/auth");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const tokenSubmitted = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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

// Cerrar sesion
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Se cerró la sesión",
  });
});

// Olvido de contraseña
exports.passwordRecovery = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("El usuario no se encuentra registrado", 404));
  }

  const resetToken = user.genResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Crear una url para hacer el reset de la contraseña

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/resetPassword/${resetToken}`;

  const message = `Hola!\n\nEl enlace para recuperar la contraseña es el siguiente: \n\n${resetURL}\n\nSi no solicitaste este enlace, por favor comunicate con soporte.\n\nAtt: Artelak`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Artelak password recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Correo enviado a: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Resetear la contraseña
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash del token que llegó con la URL
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  // Buscamos al usuario al que se le va a resetear la contraseña
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  // El usuario existe en la base de datos?
  if (!user) {
    return next(new ErrorHandler("El token es inválido o ya expiró", 403));
  }

  // Diligenciamos bien los campos?
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Las contraseñas no coinciden", 400));
  }

  // Setear la contraseña nueva
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  tokenSubmitted(user, 200, res);
});
