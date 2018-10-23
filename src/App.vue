<template>
  <div id="app">
    <b-container>
      <h1>Directory</h1>

      <Search v-model="searchText">
        <b-card-group deck style="justify-content: center">
          <ContactCard v-for="contact in filteredContacts" :contact="contact" @update:contact="updateContact" style="flex-basis: 100%"></ContactCard>
        </b-card-group>
      </Search>

    </b-container>
  </div>
</template>

<script>
import { getContacts, patchContact } from "./api/contacts.js";
import ContactCard from "./components/ContactCard";
import Search from "./components/Search";
import debounce from "lodash.debounce";

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
    searchText: debounce(async function(searchTerm) {
      this.contacts = await getContacts(searchTerm);
    }, 300)
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
