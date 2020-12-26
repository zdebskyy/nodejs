const Joi = require("joi");
require("dotenv").config();
const { Contact } = require("../models/contactModel");

async function getUsers(req, res) {
  const contacts = await Contact.find({});
  return res.status(200).json(contacts);
}

async function getById(req, res) {
  const id = req.params.contactId;
  const contact = await Contact.findById(id);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(contact);
}

async function add(req, res) {
  const contact = await new Contact(req.body);
  await contact.save();
  return res.status(201).json({ message: "Contact created" });
}

async function remove(req, res) {
  const id = req.params.contactId;
  const contactToDelete = await Contact.findByIdAndDelete(id);
  if (!contactToDelete) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "Contact deleted" });
}

async function update(req, res) {
  const id = req.params.contactId;
  const contact = await Contact.findByIdAndUpdate(id, { $set: req.body });
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "Contact modified" });
}
function validateCreateContact(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().min(1).email().required(),
    password: Joi.string().min(1).required(),
    subscription: Joi.string().required(),
    token: Joi.string(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).send(result.error);
  }
  next();
}

function validatePatchContact(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(1),
    email: Joi.string().min(1).email(),
    password: Joi.string().min(1),
    subscription: Joi.string(),
    token: Joi.string(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).send(result.error);
  }
  next();
}

module.exports = {
  getUsers,
  getById,
  add,
  remove,
  update,
  validateCreateContact,
  validatePatchContact,
};
