const path = require("path");
const fs = require("fs");

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  const data = await fs.promises.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const parsedData = data.find((el) => el.id === contactId);
  return parsedData;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const parsedData = data.filter((el) => el.id !== contactId);
  await fs.promises.writeFile(contactsPath, JSON.stringify(parsedData));
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

  const newUser = { id: userId + 1, name, email, phone };
  const newData = [...data, newUser];

  await fs.promises.writeFile(contactsPath, JSON.stringify(newData));

  return newData;
}

async function updateContact(id, values) {
  const data = await listContacts();
  const newData = data.map((el) => {
    if (el.id === id) {
      el = { ...el, ...values };
      return el;
    }
    return el;
  });
  await fs.promises.writeFile(contactsPath, JSON.stringify(newData));

  const newContact = await getContactById(id);

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
