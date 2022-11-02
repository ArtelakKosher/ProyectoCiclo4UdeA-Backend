const express = require("express");
const {
  userRegistration,
  userLogin,
  logout,
  passwordRecovery,
  resetPassword,
} = require("../controller/authController");
const { isUserAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/user/register").post(userRegistration);
router.route("/login").get(userLogin);
router.route("/logout").get(isUserAuthenticated, logout);
router.route("/passwordRecovery").post(passwordRecovery);
router.route("/resetPassword/:token").post(resetPassword);

module.exports = router;
