const state = {
  authors: [
    {
      id: 0,
      name: 'Brett Nelson',
      books: [0],
    },
  ],
};

const getters = {
  item: (_state) => (itemId) => {
    const found = _state.authors.find((item) => item.id === itemId);
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
