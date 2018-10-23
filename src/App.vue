<template>
  <div id="app">
    <div class="container">
      <h1>Hello</h1>
      <p>World</p>

      <ContactCard v-for="contact in filteredContacts" :contact="contact" @update:contact="updateContact"></ContactCard>
    </div>
  </div>
</template>

<script>
import { getContacts, patchContact } from "./api/contacts.js";
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

  computed: {
    filteredContacts() {
      return this.contacts.slice(0, 20);
    }
  },

  methods: {
    async updateContact(contact) {
      const updatedContact = await patchContact(contact);
      this.contacts.splice(
        this.contacts.findIndex(c => c.id === updatedContact.id),
        1,
        updatedContact
      );
    }
  },

  components: { ContactCard }
};
</script>
