import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contactCart: []
  },

  mutations: {
    addContactToCart(state, contact) {
      if (state.contactCart.find(c => c.id === contact.id)) return;
      state.contactCart.push(contact);
    },

    dropContactCart(state) {
      state.contactCart = [];
    }
  },

  getters: {
    alreadyFavoritedContacts(state) {
      return state.contactCart.filter(c => c.isFavorite);
    }
  }
});
