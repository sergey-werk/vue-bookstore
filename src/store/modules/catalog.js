import Axios from 'axios';

const state = {
  columns: [
    'title',
    'subtitle',
    'isbn13',
    'price',
    'image',
  ],
  authors: [

  ],
  items: [
    {
      title: 'Getting to Know Vue.js',
      subtitle: 'Learn to Build Single Page Applications in Vue from Scratch',
      isbn13: '9781484237809',
      price: '$27.96',
      image: '/bookcovers/9781484237809.png',
      url: 'https://itbook.store/books/9781484237809',
    },
    {
      title: 'Building Progressive Web Applications with Vue.js',
      subtitle: 'Reliable, Fast, and Engaging Apps with Vue.js',
      isbn13: '9781484253335',
      price: '$19.89',
      image: '/bookcovers/9781484253335.png',
      url: 'https://itbook.store/books/9781484253335',
    },
    {
      title: 'Full-Stack Web Development with Vue.js and Node',
      subtitle: 'Build scalable and powerful web apps with modern web stack: MongoDB, Vue, Node.js, and Express',
      isbn13: '9781788831147',
      price: '$35.99',
      image: '/bookcovers/9781788831147.png',
      url: 'https://itbook.store/books/9781788831147',
    },
  ],
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
    console.log(data);
    context.commit('SET_ITEMS', data);
  },
  SAVE_TODO: async (context, payload) => {
    // let { data } = await Axios.post('/books.json');
    context.commit('ADD_ITEM', payload);
  },
};

const mutations = {
  SET_ITEMS: (_state, payload) => {
    _state.items = payload; // eslint-disable-line no-param-reassign
  },
  ADD_ITEM: (_state, payload) => {
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
