const express = require("express");
const upload = require("../helpers/multerConfig");

const router = express.Router();
const {
  getCurrentUser,
  updateUserSubscription,
  updateUserAvatar,
} = require("../controllers/userController");
const { validateSubscription } = require("../validation/userValidationJoi");
const authValidation = require("../validation/authValidation");

const { minimazeImage } = require("../Middlewares/minimazeImageMiddleware");

router.get("/current", authValidation, getCurrentUser);
router.patch(
  "/avatars",
  authValidation,
  upload.single("avatar"),
  minimazeImage,
  updateUserAvatar
);
router.patch("/", authValidation, validateSubscription, updateUserSubscription);

module.exports = router;
