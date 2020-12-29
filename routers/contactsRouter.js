const express = require("express");
const router = express.Router();

const {
  validateCreateContact,
  validatePatchContact,
} = require("../validation/validationJoi");

const {
  getContact,
  getContactById,
  removeContact,
  updateContact,
  addContact,
} = require("../controllers/contactsController");

router.get("/", getContact);
router.get("/:contactId", getContactById);
router.post("/", validateCreateContact, addContact);
router.delete("/:contactId", removeContact);
router.patch("/:contactId", validatePatchContact, updateContact);

module.exports = router;
