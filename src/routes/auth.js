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

router.route("/user/register").post(userRegistration);
router.route("/login").get(userLogin);
router.route("/logout").get(isUserAuthenticated, logout);
router.route("/passwordRecovery").post(passwordRecovery);
router.route("/resetPassword/:token").post(resetPassword);
router.route("/profile").get(isUserAuthenticated, getUserProfile);
router.route("/profile/updatePassword").put(isUserAuthenticated, updatePassword);
router.route("/profile/updateProfile").put(isUserAuthenticated, updateProfile);

// Rutas gestionadas por admin
router.route("/admin/users").get(isUserAuthenticated, authorizedRoles("admin"), getUsers);
router.route("/admin/user/:id").get(isUserAuthenticated, authorizedRoles("admin"), getUserDetails);
router.route("/admin/user/:id").put(isUserAuthenticated, authorizedRoles("admin"), updateUser);

module.exports = router;
