<template>
  <div>
    <b-input v-model="searchText" class="mb-3" placeholder="Search" size="lg"/>
    <b-pagination :key="total" :disabled="!total" size="md" :total-rows="total" :value="currentPage" :per-page="perPage" @change="currentPage = $event"/>

    <slot :results="results" :replace-result="replaceResult"/>
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
      perPage: 10,
      total: 0,
      results: []
    };
  },

  computed: {
    searchText: {
      get() {
        return this.$route.query.q || "";
      },
      set(q) {
        this.updateRoute({
          q,
          p: q === this.$route.query.q ? this.$route.query.p : 1
        });
      }
    },
    currentPage: {
      get() {
        return Number(this.$route.query.p) || 1;
      },
      set(p) {
        this.updateRoute({ p });
      }
    }
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
    },

    replaceResult(result) {
      const index = this.results.findIndex(r => r.id === result.id);
      const oldResult = this.results[index];
      this.results.splice(index, 1, result);
      return oldResult;
    },

    updateRoute(partialQuery) {
      const query = { ...this.$route.query, ...partialQuery };
      if (!query.q) delete query.q;
      if (query.p === 1) delete query.p;

      this.$router.push({ query });
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
