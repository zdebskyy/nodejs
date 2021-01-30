const express = require("express");
const router = express.Router();
const {
  registration,
  login,
  logout,
  verifyEmail,
} = require("../controllers/authController");

const {
  validateUserRegistration,
  validateUserLogin,
} = require("../validation/userValidationJoi");

const authValidation = require("../validation/authValidation");

router.post("/register", validateUserRegistration, registration);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/login", validateUserLogin, login);
router.post("/logout", authValidation, logout);

module.exports = router;
