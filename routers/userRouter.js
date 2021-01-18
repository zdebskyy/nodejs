const express = require("express");
const router = express.Router();
const {
  getCurrentUser,
  getUsersFreeSubsciption,
  updateUserSubscription,
} = require("../controllers/userController");
const { validateSubscription } = require("../validation/validationJoi");
const authValidation = require("../validation/authValidation");

router.get("/current", authValidation, getCurrentUser);
router.get("/", authValidation, getUsersFreeSubsciption);
router.patch("/", authValidation, validateSubscription, updateUserSubscription);

module.exports = router;
