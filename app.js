const { Command } = require("commander");
const { listContacts, updateContacts } = require("./contacts");
const { v4 } = require("uuid");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
console.log(argv);

async function invokeAction({ action, id, name, email, phone }) {
  const listOfContacts = await listContacts();

  switch (action) {
    case "list":
      console.table(listOfContacts);
      break;

    case "get":
      if (id) {
        const contact = listOfContacts.find((person) => person.id === +id);
        console.log(contact);
      } else {
        console.log("id не указан");
      }
      break;

    case "add":
      if ((name, email, phone)) {
        const newContact = { name, email, phone, id: v4() };
        listOfContacts.push(newContact);
        await updateContacts(listOfContacts);
      } else {
        console.log("your contact is not filled in properly");
      }
      break;

    case "remove":
      if (id) {
        const idx = listOfContacts.findIndex((person) => person.id === +id);
        if (idx === -1) {
          console.log(`Contact with id=${id} not found`);
        }
        const newPersons = listOfContacts.filter((person) => person.id !== +id);
        await updateContacts(newPersons);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
