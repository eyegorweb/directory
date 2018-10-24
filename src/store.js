import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contactCart: []
  },

  mutations: {
    addContactToCart(state, contact) {
      state.contactCart.push(contact);
    }
  }
});
