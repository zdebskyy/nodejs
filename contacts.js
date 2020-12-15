const path = require("path");
const fs = require("fs");

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  const data = await fs.promises.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const parsedData = data.filter((el) => el.id === contactId);
  return parsedData;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const parsedData = data.filter((el) => el.id !== contactId);
  return parsedData;
}

async function addContact(name, email, phone) {
  const data = await listContacts();

  let userId = 0;
  data.forEach((element) => {
    if (element.id > userId) {
      userId = element.id;
    }
  });

  const newUser = { name, email, phone, id: userId + 1 };
  return [...data, newUser];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
