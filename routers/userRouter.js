const express = require("express");
const router = express.Router();
const {
  getCurrentUser,
  getUsersFreeSubsciption,
  updateUserSubscription,
} = require("../controllers/userController");
const { validateSubscription } = require("../validation/userValidationJoi");
const authValidation = require("../validation/authValidation");

router.get("/current", authValidation, getCurrentUser);
router.patch("/", authValidation, validateSubscription, updateUserSubscription);

module.exports = router;
