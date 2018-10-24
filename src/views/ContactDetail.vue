<template>
  <div>
    <b-button :disabled="!contact" class="mb-3" :variant="isAdded ? 'danger' : 'success'" @click="cartAction">{{ cartActionText }}</b-button>
    <ContactCard v-if="contact" :contact="contact"  @update:contact="updateContact" hide-detail-link />
    <p v-else>loading...</p>
  </div>
</template>

<script>
import { patchContact } from "../api/contacts.js";
import ContactCard from "../components/ContactCard";
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  created() {
    this.fetchCurrentContact(this.id).then(() => {
      console.log(this.contact);
    });
  },

  destroyed() {
    this.setCurrentContact(null);
  },

  methods: {
    async updateContact(contact) {
      this.setCurrentContact(await patchContact(contact));
    },
    cartAction() {
      if (this.isAdded) this.removeFromCart(this.contact);
      else this.addToCart(this.contact);
    },
    ...mapActions(["fetchCurrentContact"]),
    ...mapMutations({
      addToCart: "addContactToCart",
      removeFromCart: "removeContactFromCart",
      setCurrentContact: "setCurrentContact"
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
    ...mapGetters(["isInContactCart"]),
    ...mapState({
      contact: "currentContact"
    })
  },

  components: { ContactCard }
};
</script>

<style scoped>
</style>
