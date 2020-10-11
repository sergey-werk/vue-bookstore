import client from '@/api/client';

const state = {
  items: [
    /*     {
      id: 0,
      name: 'Brett Nelson',
      books: [0],
    }, */
  ],
  selectedItem: '',
};

const getters = {
  getAuthorById: (_state) => (id) => {
    const found = _state.items.find((item) => item.id === id);
    return found;
  },
  getAuthorsByBookId: (_state) => (id) => {
    const found = _state.items.filter((item) => item.books.includes(id));
    return found;
  },
};

const actions = {
  fetchAuthors: async ({ commit, state: { items } }) => {
    if (!items.length) {
      commit('setLoading', true, { root: true });
    }
    await client.fetchItems('/authors.json')
      .finally(() => commit('setLoading', false, { root: true }))
      .then((data) => commit('AUTHORS_SET', data));
  },
  addAuthor: ({ commit }, payload) => {
    // FIXME: Not implemented yet.
    commit('AUTHOR_ADD', payload);
  },
};

const mutations = {
  AUTHORS_SET: (_state, payload) => {
    _state.items = payload; // eslint-disable-line no-param-reassign
  },
  AUTHOR_ADD: (_state, payload) => {
    _state.items.push(payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
