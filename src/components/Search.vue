<template>
  <div>
    <b-input v-model="query" class="mb-3" placeholder="Search" size="lg"/>

    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },

  computed: {
    query: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>

<style scoped>
</style>
