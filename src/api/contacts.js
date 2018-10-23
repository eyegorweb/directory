import axios from "axios";

const contacts = axios.create({
  baseURL: "http://localhost:3000/contacts"
});

export function getContacts(q, page, perPage) {
  return contacts
    .get("/", {
      params: {
        q,
        _start: (page - 1) * perPage,
        _limit: perPage
      }
    })
    .then(res => ({
      contacts: res.data,
      total: Number(res.headers["x-total-count"]) || 0
    }));
}

export function patchContact(contact) {
  return contacts.patch("/" + contact.id, contact).then(res => res.data);
}
