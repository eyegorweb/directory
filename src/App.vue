<template>
  <div id="app">
    <b-container>
      <h1>Directory</h1>

      <Search :fetch="getContacts">
        <b-card-group deck style="justify-content: center" slot-scope="{ results }">
          <ContactCard v-for="contact in results" :contact="contact" :key="contact.id" @update:contact="updateContact" style="flex-basis: 100%"></ContactCard>
        </b-card-group>
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

  created() {
    this.getContacts = getContacts;
  },

  methods: {
    async updateContact(contact) {
      const index = this.contacts.findIndex(c => c.id === contact.id);
      const oldContact = this.contacts[index];
      // TODO
      // this.contacts.splice(index, 1, contact);
      try {
        await patchContact(contact);
      } catch (e) {
        // revert
        // this.contacts.splice(index, 1, oldContact);
      }
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
