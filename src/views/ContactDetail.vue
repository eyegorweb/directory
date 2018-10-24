<template>
  <div>
    <ContactCard v-if="contact" :contact="contact"  @update:contact="updateContact" hide-detail-link />
    <p v-else>loading...</p>
  </div>
</template>

<script>
import { getContact, patchContact } from "../api/contacts.js";
import ContactCard from "../components/ContactCard";

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      contact: null
    };
  },

  async created() {
    this.contact = await getContact(this.id);
  },

  methods: {
    async updateContact(contact) {
      this.contact = await patchContact(contact);
    }
  },

  components: { ContactCard }
};
</script>

<style scoped>
</style>
