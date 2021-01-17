const express = require("express");
const router = express.Router();
const {
  registration,
  login,
  logout,
  getCurrentUser,
} = require("../controllers/userController");

const {
  validateUserRegistration,
  validateUserLogin,
} = require("../validation/validationJoi");

const authValidation = require("../validation/authValidation");

router.post("/auth/register", validateUserRegistration, registration);
router.post("/auth/login", validateUserLogin, login);
router.patch("/auth/logout", authValidation, logout);
router.get("/current", authValidation, getCurrentUser);

module.exports = router;
