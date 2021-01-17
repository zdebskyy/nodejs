const express = require("express");
const router = express.Router();
const { getCurrentUser } = require("../controllers/userController");

const authValidation = require("../validation/authValidation");

router.get("/current", authValidation, getCurrentUser);

module.exports = router;
