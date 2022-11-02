const express = require("express");
const { userRegistration, userLogin } = require("../controller/authController");
const router = express.Router();

router.route("/user/register").post(userRegistration);
router.route("/login").get(userLogin);

module.exports = router;
