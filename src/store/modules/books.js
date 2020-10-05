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
  book: (_state) => (id) => {
    const found = _state.items.find((item) => item.id === id);
    return found;
  },
};

const actions = {
  fetchBooks: async (context) => {
    client.fetchItems('/books.json',
      (data) => {
        context.commit('BOOKS_SET', data);
      });
  },
  addBook: async (context, payload) => {
    // FIX: Not implemented yet
    context.commit('BOOK_ADD', payload);
  },
};

const mutations = {
  BOOKS_SET: (_state, payload) => {
    _state.items = payload; // eslint-disable-line no-param-reassign
  },
  BOOK_ADD: (_state, payload) => {
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
