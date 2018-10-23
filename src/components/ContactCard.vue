<template>
  <b-card :title="fullName"
          :img-src="contact.avatar"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
  >
    <b-form v-if="isEditing" @submit.prevent="isEditing = false">
      <b-form-input
        type="text"
        v-model="contact.firstName"
        required
        placeholder="Firstname"
      />
      <b-button type="submit">Save</b-button>
    </b-form>

    <template v-else>
      <p class="card-text">
        Email: {{ contact.email }}
        <br>
        <template v-if="contact.gender">
          Gender: {{ contact.gender }}
          <br>
        </template>
        Registered at {{ contact.registeredAt }}
      </p>
      <b-button @click="isEditing = true" variant="primary">Edit</b-button>
    </template>

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

  data() {
    return {
      isEditing: false
    };
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
