import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import catalog from './modules/catalog';
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
    catalog,
    authors,
  },
  plugins: [createPersistedState()],
});
