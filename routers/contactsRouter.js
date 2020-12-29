const express = require("express");
const router = express.Router();

const {
  validateCreateContact,
  validatePatchContact,
} = require("../validation/validationJoi");

const {
  getContactsList,
  getContactById,
  removeContact,
  updateContact,
  addContact,
} = require("../controllers/contactsController");

router.get("/", getContactsList);
router.get("/:contactId", getContactById);
router.post("/", validateCreateContact, addContact);
router.delete("/:contactId", removeContact);
router.patch("/:contactId", validatePatchContact, updateContact);

module.exports = router;
