import Vue from "vue";
import Vuex from "vuex";
import { patchContact, getContact } from "./api/contacts";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contactCart: [],
    currentContact: null
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
    },

    setCurrentContact(state, contact) {
      state.currentContact = contact;
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
    },
    async fetchCurrentContact({ commit }, id) {
      commit("setCurrentContact", await getContact(id));
    }
  }
});
