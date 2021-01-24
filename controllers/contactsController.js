const { ContactModel } = require("../models/contactModel");

async function getContactsList(req, res) {
  const contacts = await ContactModel.find({});
  return res.status(200).json(contacts);
}

async function getContactById(req, res) {
  const id = req.params.contactId;
  const contact = await ContactModel.findById(id);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(contact);
}

async function addContact(req, res) {
  const contact = await new ContactModel(req.body);
  await contact.save();
  return res.status(201).json({ message: "Contact created" });
}

async function removeContact(req, res) {
  const id = req.params.contactId;
  const contactToDelete = await ContactModel.findByIdAndDelete(id);
  if (!contactToDelete) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "Contact deleted" });
}

async function updateContact(req, res) {
  const id = req.params.contactId;
  const contact = await ContactModel.findByIdAndUpdate(id, { $set: req.body });
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "Contact modified" });
}
async function getContactFreeSubsciption(req, res) {
  const { sub } = req.query;

  const freeSubContact = await ContactModel.find({
    subscription: { $eq: sub },
  });

  return res.status(200).json(freeSubContact);
}

module.exports = {
  getContactsList,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  getContactFreeSubsciption,
};
