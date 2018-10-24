<template>
  <div>
    <ContactCard v-if="contact" :contact="contact"  @update:contact="updateContact" />
    <p v-else>loading...</p>
  </div>
</template>

<script>
import { getContact, patchContact } from "../api/contacts.js";
import ContactCard from "../components/ContactCard";

export default {
  data() {
    return {
      contact: null
    };
  },

  async created() {
    this.contact = await getContact(this.$route.params.id);
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
