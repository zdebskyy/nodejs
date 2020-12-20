const express = require("express");
const router = express.Router();

const {
  getUsers,
  getById,
  remove,
  update,
  add,
} = require("../controllers/contactsController");

router.get("/", getUsers);

router.get("/:contactId", getById);

router.post("/", add);

router.delete("/:contactId", remove);

router.patch("/:contactId", update);

module.exports = router;
