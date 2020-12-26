const express = require("express");
const router = express.Router();

const {
  validateCreateContact,
  validatePatchContact,
} = require("../validation/validationJoi");

const {
  getUsers,
  getById,
  remove,
  update,
  add,
} = require("../controllers/contactsController");

router.get("/", getUsers);
router.get("/:contactId", getById);
router.post("/", validateCreateContact, add);
router.delete("/:contactId", remove);
router.patch("/:contactId", validatePatchContact, update);

module.exports = router;
