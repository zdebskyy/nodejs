const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../contacts");

async function getUsers(req, res) {
  res.status(200).json(await listContacts());
}

async function getById(req, res) {
  const id = parseInt(req.params.contactId);
  const contact = await getContactById(id);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
}

async function add(req, res) {
  const { name, email, phone } = req.body;
  const contact = await addContact(name, email, phone);
  return res.status(200).json(contact);
}

async function remove(req, res) {
  const id = parseInt(req.params.contactId);
  const contact = await getContactById(id);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  const contactToDelete = await removeContact(id);
  return res.status(200).json(contactToDelete);
}

async function update(req, res) {
  const id = parseInt(req.params.contactId);
  const contact = await getContactById(id);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  const updatedContact = await updateContact(id, req.body);
  return res.status(200).json(updatedContact);
}
function validateCreateContact(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().min(1).email().required(),
    phone: Joi.string().min(1).required(),
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
    phone: Joi.string().min(1),
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
