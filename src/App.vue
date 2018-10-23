<template>
  <div id="app">
    <b-container>
      <h1>Directory</h1>

      <Search v-model="searchText">
        <ContactCard v-for="contact in filteredContacts" :contact="contact" @update:contact="updateContact"></ContactCard>
      </Search>

    </b-container>
  </div>
</template>

<script>
import { getContacts, patchContact } from "./api/contacts.js";
import ContactCard from "./components/ContactCard";
import Search from "./components/Search";

export default {
  name: "app",

  data() {
    return {
      searchText: "",
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
      const index = this.contacts.findIndex(c => c.id === contact.id);
      const oldContact = this.contacts[index];
      this.contacts.splice(index, 1, contact);
      try {
        await patchContact(contact);
      } catch (e) {
        // revert
        this.contacts.splice(index, 1, oldContact);
      }
    }
  },

  watch: {
    async searchText(searchTerm) {
      this.contacts = await getContacts(searchTerm);
    }
  },

  components: { ContactCard, Search }
};
</script>

<style>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter {
  transform: translateX(-278px);
}

.fade-leave-to {
  transform: translateX(278px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms, transform 200ms;
}
.fade-leave-active {
  position: absolute;
}
</style>
