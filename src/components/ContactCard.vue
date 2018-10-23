<template>
  <b-card :title="fullName"
          :img-src="contact.avatar"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
  >
    <p class="card-text">
      Email: {{ contact.email }}
      <br>
      <template v-if="contact.gender">
        Gender: {{ contact.gender }}
        <br>
      </template>
      Registered at {{ contact.registeredAt }}
    </p>
    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true
    }
  },

  computed: {
    fullName() {
      return this.contact.firstName + " " + this.contact.lastName;
    }
  }
};
</script>

<style scoped>
</style>
