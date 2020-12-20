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
  return res
    .status(200)
    .json(await getContactById(parseInt(req.params.contactId)));
};

module.exports.add = async (req, res) => {
  const { name, email, phone } = req.body;
  return res.status(200).json(await addContact(name, email, phone));
};

module.exports.remove = async (req, res) => {
  return res
    .status(200)
    .json(await removeContact(parseInt(req.params.contactId)));
};

module.exports.update = async (req, res) => {
  return res
    .status(200)
    .json(await updateContact(parseInt(req.params.contactId), req.body));
};
module.exports.validateCreateContact = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().min(1).required(),
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
    email: Joi.string().min(1),
    phone: Joi.string().min(1),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).send(result.error);
  }
  next();
};
