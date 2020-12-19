const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("../contacts");

module.exports.getUsers = async (req, res) => {
  res.status(200).json(await listContacts());
};

module.exports.getById = async (req, res) => {
  return res
    .status(200)
    .json(await getContactById(parseInt(req.params.contactId)));
};

module.exports.remove = async (req, res) => {
  return res
    .status(200)
    .json(await removeContact(parseInt(req.params.contactId)));
};
