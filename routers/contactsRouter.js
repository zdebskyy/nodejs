const express = require("express");
const router = express.Router();

const {
  getUsers,
  getById,
  remove,
  update,
  add,
  validateCreateContact,
  validatePatchContact,
} = require("../controllers/contactsController");

router.get("/", getUsers);

router.get("/:contactId", getById);

router.post("/", validateCreateContact, add);

router.delete("/:contactId", remove);

router.patch("/:contactId", validatePatchContact, update);

module.exports = router;
