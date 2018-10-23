<template>
  <b-card :title="fullName"
          :img-src="contact.avatar"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
  >
    <transition name="fade" mode="">
      <b-form v-if="isEditing" @submit.prevent="saveContact">
        <b-form-input
          type="text"
          v-model="localCopy.firstName"
          required
          placeholder="Firstname"
        />
        <b-form-input
          type="text"
          v-model="localCopy.lastName"
          required
          placeholder="Lastname"
        />
        <b-form-input
          type="email"
          v-model="localCopy.email"
          required
          placeholder="Email"
        />

        <b-form-select v-model="localCopy.gender" class="mb-3">
          <option :value="null">Not specified</option>
          <option>Male</option>
          <option>Female</option>
        </b-form-select>

        <b-button type="submit" class="mr-2">Save</b-button>
        <b-button type="button" @click="isEditing = false">Cancel</b-button>
      </b-form>

      <div v-else>
        <p class="card-text">
          Email: {{ contact.email }}
          <br>
          <template v-if="contact.gender">
            Gender: {{ contact.gender }}
            <br>
          </template>
          Registered at {{ contact.registeredAt }}
        </p>
        <b-button @click="startEdit" variant="primary">Edit</b-button>
      </div>
    </transition>

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
      isEditing: false,
      localCopy: null
    };
  },

  methods: {
    startEdit() {
      this.localCopy = { ...this.contact };
      this.isEditing = true;
    },
    saveContact() {
      this.isEditing = false;
      this.$emit("update:contact", this.localCopy);
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
