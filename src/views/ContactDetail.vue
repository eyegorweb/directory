<template>
  <div>
    <b-button :disabled="!contact" class="mb-3" :variant="isAdded ? 'danger' : 'success'" @click="cartAction">{{ cartActionText }}</b-button>
    <ContactCard v-if="contact" :contact="contact"  @update:contact="updateContact" hide-detail-link />
    <p v-else>loading...</p>
  </div>
</template>

<script>
import { getContact, patchContact } from "../api/contacts.js";
import ContactCard from "../components/ContactCard";
import { mapMutations, mapGetters } from "vuex";

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
    },
    cartAction() {
      if (this.isAdded) this.removeFromCart(this.contact);
      else this.addToCart(this.contact);
    },
    ...mapMutations({
      addToCart: "addContactToCart",
      removeFromCart: "removeContactFromCart"
    })
  },

  computed: {
    isAdded() {
      if (!this.contact) return false;
      return this.isInContactCart(this.contact);
    },
    cartActionText() {
      if (!this.contact) return "";
      return this.isAdded ? "Remove from cart" : "Add to cart";
    },
    ...mapGetters(["isInContactCart"])
  },

  components: { ContactCard }
};
</script>

<style scoped>
</style>
