const { Contact } = require("../models/contactModel");

async function getContact(req, res) {
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

async function addContact(req, res) {
  const contact = await new Contact(req.body);
  await contact.save();
  return res.status(201).json({ message: "Contact created" });
}

async function removeContact(req, res) {
  const id = req.params.contactId;
  const contactToDelete = await Contact.findByIdAndDelete(id);
  if (!contactToDelete) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "Contact deleted" });
}

async function updateContact(req, res) {
  const id = req.params.contactId;
  const contact = await Contact.findByIdAndUpdate(id, { $set: req.body });
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "Contact modified" });
}

module.exports = {
  getContact,
  getById,
  addContact,
  removeContact,
  updateContact,
};
