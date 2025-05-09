const { Command } = require("commander");
const contacts = require("./contacts");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await contacts.listContacts());
      break;
    case "get":
      console.log(await contacts.getContactById(id));
      break;
    case "add":
      console.log(await contacts.addContact(name, email, phone));
      break;
    case "remove":
      console.log(await contacts.removeContact(id));
      break;
    default:
      console.warn("Unknown action!");
  }
}

invokeAction(options);
