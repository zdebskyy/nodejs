const express = require("express");
const router = express.Router();
const {
  registration,
  login,
  logout,
} = require("../controllers/authController");

const {
  validateUserRegistration,
  validateUserLogin,
} = require("../validation/userValidationJoi");

const authValidation = require("../validation/authValidation");

router.post("/register", validateUserRegistration, registration);
router.post("/login", validateUserLogin, login);
router.patch("/logout", authValidation, logout);

module.exports = router;
