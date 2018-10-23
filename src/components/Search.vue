<template>
  <div>
    <b-input v-model="searchText" class="mb-3" placeholder="Search" size="lg"/>
    <b-pagination size="md" :total-rows="total" v-model="currentPage" :per-page="perPage"/>

    <slot :results="results"/>
  </div>
</template>

<script>
import debounce from "lodash.debounce";

export default {
  props: {
    fetch: {
      type: Function,
      required: true
    }
  },

  data() {
    return {
      searchText: "",
      perPage: 10,
      currentPage: 1,
      total: 0,
      results: []
    };
  },

  methods: {
    async fetchResults() {
      const { results, total } = await this.fetch(
        this.searchText,
        this.currentPage,
        this.perPage
      );
      this.results = results;
      this.total = total;
    }
  },

  created() {
    this.fetchResults();
    this.$watch(
      () => this.searchText + this.perPage + this.currentPage,
      debounce(this.fetchResults, 300)
    );
  }
};
</script>

<style scoped>
</style>
