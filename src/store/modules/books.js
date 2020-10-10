import client from '@/api/client';

const state = {
  items: [
    /*
    {
      id: 0,
      title: 'Getting to Know Vue.js',
      subtitle: 'Learn to Build Single Page Applications in Vue from Scratch',
      authors: 'Brett Nelson',
      publisher: 'Apress',
      language: 'English',
      isbn10: '1484237803',
      isbn13: '9781484237809',
      pages: '265',
      year: '2018',
      rating: '2',
      desc: 'Learn how to render lists of items without repeating your code structure ...',
      price: '$27.96',
      image: '/bookcovers/9781484237809.png',
      url: 'https://itbook.store/books/9781484237809',
    },
  */],
  selectedItem: '',
};

const getters = {
  getBookById: (_state) => (id) => {
    const found = _state.items.find((item) => item.id === id);
    return found;
  },
};

const actions = {
  fetchBooks: async ({ commit, state: { items } }) => {
    if (!items.length) {
      commit('setLoading', true, { root: true });
    }
    console.log('fetchBooks');
    await client.fetchItems('/books.json')
      .finally(() => commit('setLoading', false, { root: true }))
      .then((data) => commit('BOOKS_SET', data));
  },
  addBook: async ({ commit }, payload) => {
    // FIX: Not implemented yet
    commit('BOOK_ADD', payload);
  },
};

const mutations = {
  BOOKS_SET: (_, payload) => {
    _.items = payload; // eslint-disable-line no-param-reassign
  },
  BOOK_ADD: (_, payload) => {
    _.items.push(payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
