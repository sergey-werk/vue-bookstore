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
  author: (_state) => (id) => {
    const found = _state.items.find((item) => item.id === id);
    return found;
  },
};

const actions = {
  fetchAuthors: async (context) => {
    client.fetchItems('/authors.json',
      (data) => {
        context.commit('AUTHORS_SET', data);
      });
  },
  addAuthor: async (context, payload) => {
    // FIXME: Not implemented yet.
    context.commit('AUTHOR_ADD', payload);
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
