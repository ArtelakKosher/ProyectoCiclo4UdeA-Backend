const express = require("express");
const {
  userRegistration,
  userLogin,
  logout,
  passwordRecovery,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  getUsers,
  getUserDetails,
  updateUser,
} = require("../controller/authController");
const { isUserAuthenticated, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

// Rutas gestionadas por user
router.route("/user/register").post(userRegistration);
router.route("/user/login").get(userLogin);
router.route("/user/logout").get(isUserAuthenticated, logout);
router.route("/user/passwordRecovery").post(passwordRecovery);
router.route("/user/resetPassword/:token").post(resetPassword);
router.route("/user").get(isUserAuthenticated, getUserProfile);
router.route("/user/updatePassword").put(isUserAuthenticated, updatePassword);
router.route("/user/updateProfile").put(isUserAuthenticated, updateProfile);

// Rutas gestionadas por admin
router.route("/admin/users").get(isUserAuthenticated, authorizedRoles("admin"), getUsers);
router.route("/admin/user/:id").get(isUserAuthenticated, authorizedRoles("admin"), getUserDetails);
router.route("/admin/user/:id").put(isUserAuthenticated, authorizedRoles("admin"), updateUser);

module.exports = router;
