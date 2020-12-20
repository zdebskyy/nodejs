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
