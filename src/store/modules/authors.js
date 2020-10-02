const state = {
  items: [
    {
      id: 0,
      name: 'Brett Nelson',
      books: [0],
    },
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
    // const { data } = await Axios.get('/authors.json');
    const data = state.authors;
    context.commit('SET_AUTHORS', data);
  },
  saveAuthor: async (context, payload) => {
    // let { data } = await Axios.post('/authors.json');
    context.commit('ADD_AUTHOR', payload);
  },
};

const mutations = {
  SET_AUTHORS: (_state, payload) => {
    _state.authors = payload; // eslint-disable-line no-param-reassign
  },
  ADD_AUTHOR: (_state, payload) => {
    _state.authors.push(payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
