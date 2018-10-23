<template>
  <div id="app">
    <b-container>
      <h1>Directory</h1>

      <Search v-model="searchText">
        <b-pagination size="md" :total-rows="total" v-model="currentPage" :per-page="perPage"/>
        <b-card-group deck style="justify-content: center">
          <ContactCard v-for="contact in filteredContacts" :contact="contact" :key="contact.id" @update:contact="updateContact" style="flex-basis: 100%"></ContactCard>
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
      perPage: 10,
      currentPage: 1,
      total: 0,
      contacts: []
    };
  },

  created() {
    this.searchContacts();
    this.$watch(
      () => this.searchText + this.perPage + this.currentPage,
      debounce(this.searchContacts, 300)
    );
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
    },
    async searchContacts() {
      const { contacts, total } = await getContacts(
        this.searchText,
        this.currentPage,
        this.perPage
      );
      this.contacts = contacts;
      this.total = total;
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
