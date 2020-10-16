/**
 * Class for some CRUD-compatible items list.
 * (Create, Read, Update, Delete)
 *
 * Each list items must have unique 'id' property.
 */
import client from '@/api/client';

export default class {
  constructor(url) {
    this.state = {
      url, // API endpoint
      isLoading: false,
      items: [],
    };

    this.getters = {
      byId: ({ items }) => (id) => items.find((o) => o.id === id),
      attrUnique: ({ items }) => function attrUnique(attr, type = String) {
        return Array.from(new Set(items.map((o) => o[attr])))
          .map(type).sort();
      },
      isLoading: (state) => !!state.isLoading,
    };

    this.actions = {
      async add({ commit }, payload) {
        // FIXME: Not implemented.
        commit('ITEMS_ADD', payload);
      },

      async delete({ commit }, payload) {
        // FIXME: Not implemented.
        commit('ITEMS_DELETE', payload);
      },

      async fetch({ commit, state }) {
        if (!state.items.length) { // update silently
          commit('LOADING_SET', true);
        }
        await client.fetchItems(state.url)
          .finally(() => commit('LOADING_SET', false))
          .then((data) => commit('ITEMS_SET', data));
      },
    };

    this.mutations = {
      LOADING_SET(state, v) { state.isLoading = v; },
      ITEMS_SET(state, arr) { state.items = [...arr]; }, // FIXME: check
      ITEMS_ADD(state, ...arr) { state.items.push(...arr); }, // FIXME: check
      ITEMS_DELETE(state, ...arr) {
        state.items = state.items.filter((item) => !arr.includes(item)); // FIXME: check
      },
    };
  }
}
