<template>
  <Search :fetch="getContacts">
    <b-card-group deck style="justify-content: center" slot-scope="{ results, replaceResult }">
      <ContactCard v-for="contact in results" :contact="contact" :key="contact.id" @update:contact="updateContact($event, replaceResult)" style="flex-basis: 100%"></ContactCard>
    </b-card-group>
  </Search>
</template>

<script>
import { getContacts, patchContact } from "../api/contacts.js";
import ContactCard from "../components/ContactCard";
import Search from "../components/Search";

export default {
  created() {
    this.getContacts = getContacts;
  },

  methods: {
    async updateContact(contact, replaceResult) {
      const oldContact = replaceResult(contact);
      try {
        await patchContact(contact);
      } catch (e) {
        // revert
        replaceResult(oldContact);
      }
    }
  },

  components: { ContactCard, Search }
};
</script>

<style scoped>
</style>
