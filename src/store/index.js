import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';

import books from './modules/books';
import authors from './modules/authors';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    books,
    authors,
  },
  // plugins: [createPersistedState()],
});
