import axios from "axios";

const contacts = axios.create({
  baseURL: "http://localhost:3000/contacts"
});

export function getContacts() {
  return contacts.get("/").then(res => res.data);
}

export function patchContact(contact) {
  return contacts.patch("/" + contact.id, contact).then(res => res.data);
}
