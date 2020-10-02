const state = {
  items: [
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
      desc: 'Learn how to render lists of items without repeating your code structure and how to work with conditional rendering items and event handling. Containing all you need to know to get started with Vue.js, this book will take you through using build tools (transpile to ES5), creating custom components, ...',
      price: '$27.96',
      image: '/bookcovers/9781484237809.png',
      url: 'https://itbook.store/books/9781484237809',
    },
  ],
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
    // const { data } = await Axios.get('/books.json');
    const data = state.books;
    context.commit('SET_BOOKS', data);
  },
  addBook: async (context, payload) => {
    // : Not implemented
    // let { data } = await Axios.post('/books/');
    context.commit('ADD_BOOK', payload);
  },
};

const mutations = {
  SET_BOOKS: (_state, payload) => {
    _state.books = payload; // eslint-disable-line no-param-reassign
  },
  ADD_BOOK: (_state, payload) => {
    _state.books.push(payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
