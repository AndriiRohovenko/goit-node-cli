import path from "node:path";
import { nanoid } from "nanoid";
import { readFile, writeFile } from "node:fs/promises";

const contactsPath = path.resolve("src", "db", "contacts.json");

export async function listContacts() {
  try {
    const data = await readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts:", error);
    throw error;
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.error("Error getting contact by ID:", error);
    throw error;
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const deletedContact = contacts.find((contact) => contact.id === contactId);
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return deletedContact || null;
  } catch (error) {
    console.error("Error removing contact:", error);
    throw error;
  }
}

export async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error);
    throw error;
  }
}
