<template>
  <div id="app">
    <div class="container">
      <h1>Hello</h1>
      <p>World</p>

      <pre>{{ contacts[9] }}</pre>
      <ContactCard v-if="contacts.length" :contact="contacts[0]"></ContactCard>
    </div>
  </div>
</template>

<script>
import { getContacts } from "./api/contacts.js";
import ContactCard from "./components/ContactCard";

export default {
  name: "app",

  data() {
    return {
      contacts: []
    };
  },

  created() {
    getContacts().then(contacts => {
      this.contacts = contacts;
    });
  },

  components: { ContactCard }
};
</script>
