const fs = require("fs").promises;
const { v4 } = require("uuid");
/* const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json"); */

const listOfContacts = require("./db/filePath");

// console.log(listOfContacts);

async function listContacts() {
  try {
    const data = await fs.readFile(listOfContacts);
    const contacts = JSON.parse(data);
    // console.log(contacts);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

// listContacts();

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const foundContact = data.find((person) => person.id === contactId);
    if (!foundContact) {
      throw new Error(`Product with id=${contactId} not found`);
    }
    console.log(foundContact);
    return foundContact;
  } catch (error) {
    console.log(error.message);
  }
}
// getContactById(2);

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const idx = data.findIndex((person) => person.id === contactId);
    if (idx === -1) {
      throw new Error(`Contact with id=${contactId} not found`);
    }
    const newPersons = data.filter((person) => person.id !== contactId);
    // const delProduct = products.splice(idx, 1);
    await updateContacts(newPersons);
    // return data[idx];
  } catch (error) {
    console.log(error.message);
  }
}

// removeContact();

async function addContact(data) {
  try {
    const contacts = await listContacts();
    const newContact = { ...data, id: v4() };
    // const newProducts = [...products, newProduct];
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (error) {
    throw error;
  }
}
const newPerson = {
  name: "Vasya Pupkin",
  email: "vas@hulla.com",
  phone: "(302) 365-2244",
};
// addContact(newPerson);

async function updateContacts(contacts) {
  const contactsString = JSON.stringify(contacts);
  await fs.writeFile(listOfContacts, contactsString);
  console.table(JSON.parse(contactsString));
}

module.exports = {
  listContacts,
  getContactById,
  updateContacts,
  removeContact,
  addContact,
};
