const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../contacts");

module.exports.getUsers = async (req, res) => {
  res.status(200).json(await listContacts());
};

module.exports.getById = async (req, res) => {
  const id = parseInt(req.params.contactId);
  const contact = await getContactById(id);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
};

module.exports.add = async (req, res) => {
  const { name, email, phone } = req.body;
  const contact = await addContact(name, email, phone);
  return res.status(200).json(contact);
};

module.exports.remove = async (req, res) => {
  const id = parseInt(req.params.contactId);
  const contact = await getContactById(id);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  const contactToDelete = await removeContact(id);
  return res.status(200).json(contactToDelete);
};

module.exports.update = async (req, res) => {
  const id = parseInt(req.params.contactId);
  const contact = await getContactById(id);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  const updatedContact = await updateContact(id, req.body);
  return res.status(200).json(updatedContact);
};
module.exports.validateCreateContact = (req, res, next) => {
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
};

module.exports.validatePatchContact = (req, res, next) => {
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
};
