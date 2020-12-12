const path = require('path');

const contactsPath = path.join('.'+'db'+'contacts.json');
 

function listContacts() {
    
}

function getContactById(contactId) {
  // ...твой код
}

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  // ...твой код
}

module.exports = {
    listContacts, 
    getContactById,
    removeContact,
    addContact
}