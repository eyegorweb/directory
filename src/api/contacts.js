import axios from "axios";

export function getContacts() {
  return axios.get("http://localhost:3000/contacts").then(res => res.data);
}
