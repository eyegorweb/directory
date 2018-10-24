import Vue from "vue";
import Vuex from "vuex";
import { patchContact } from "./api/contacts";

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

    removeContactFromCart(state, contact) {
      state.contactCart.splice(
        state.contactCart.findIndex(c => c.id === contact.id),
        1
      );
    },

    dropContactCart(state) {
      state.contactCart = [];
    }
  },

  getters: {
    alreadyFavoritedContacts(state) {
      return state.contactCart.filter(c => c.isFavorite);
    },
    isInContactCart(state) {
      return contact => state.contactCart.some(c => c.id === contact.id);
    }
  },

  actions: {
    async saveContactsInCartAsFavorite({ commit, state }) {
      await Promise.all(
        state.contactCart.map(contact =>
          patchContact({ ...contact, isFavorite: true })
        )
      );
      commit("dropContactCart");
    }
  }
});
