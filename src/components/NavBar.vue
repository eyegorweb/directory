<template>
  <b-navbar toggleable="md">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand :to="{ name: 'Home' }">Directory</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <!-- <b-navbar-nav>
        <b-nav-item :to="{ name: 'Home' }">Home</b-nav-item>
        <b-nav-item :to="{ name: 'Home' }">Search</b-nav-item>
      </b-navbar-nav> -->

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown> -->

        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>Contact Cart <b-badge>{{ $store.state.contactCart.length }}</b-badge></em>
          </template>
          <b-dropdown-item v-if="alreadyFavoritedContacts.length" disabled>{{ alreadyFavoritedContacts.length }} are already favorited</b-dropdown-item>
          <b-dropdown-item href="#">Add to favorite</b-dropdown-item>
          <b-dropdown-item @click="dropContactCart">Drop</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  methods: mapMutations(["dropContactCart"]),
  computed: mapGetters(["alreadyFavoritedContacts"])
};
</script>

<style scoped>
</style>
