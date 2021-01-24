const express = require("express");
const router = express.Router();

const {
  validateCreateContact,
  validatePatchContact,
} = require("../validation/contactValidationJoi");

const {
  getContactsList,
  getContactById,
  removeContact,
  updateContact,
  addContact,
  getContactFreeSubsciption,
} = require("../controllers/contactsController");

router.get("/", getContactFreeSubsciption);
router.get("/", getContactsList);
router.get("/:contactId", getContactById);
router.post("/", validateCreateContact, addContact);
router.delete("/:contactId", removeContact);
router.patch("/:contactId", validatePatchContact, updateContact);

module.exports = router;
