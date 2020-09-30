import Axios from 'axios';

const state = {
  items: [
    /* {
      title: 'Getting to Know Vue.js',
      subtitle: 'Learn to Build Single Page Applications in Vue from Scratch',
      isbn13: '9781484237809',
      price: '$27.96',
      image: '/bookcovers/9781484237809.png',
      url: 'https://itbook.store/books/9781484237809',
    },
    */
  ],
  selectedItem: '',
};

const getters = {
  item: (_state) => (itemId) => {
    const found = _state.items.find((item) => item.id === itemId);
    return found;
  },
};

const actions = {
  GET_ITEMS: async (context) => {
    const { data } = await Axios.get('/books.json');
    context.commit('ITEMS_SET', data);
  },
  ADD_ITEM: async (context, payload) => {
    // : Not implemented
    // let { data } = await Axios.post('/books/');
    context.commit('ITEM_ADD', payload);
  },
};

const mutations = {
  ITEMS_SET: (_state, payload) => {
    _state.items = payload; // eslint-disable-line no-param-reassign
  },
  ITEM_ADD: (_state, payload) => {
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
