const express = require("express");
const router = express.Router();

const {
  getUsers,
  getById,
  remove,
} = require("../controllers/contactsController");

router.get("/", getUsers);

router.get("/:contactId", getById);

router.delete("/:contactId", remove);

module.exports = router;
