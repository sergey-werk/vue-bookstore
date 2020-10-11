import Crud from '@/store/classes/crud';

/* Author item:
    {
      id: 0,
      name: 'Brett Nelson',
      books: [0],
    }
  */

const crud = new Crud(`${process.env.BASE_URL}authors.json`);

const state = {
  ...crud.state,
};
const getters = {
  ...crud.getters,
  byBookId: ({ items }) => (bookId) => items.filter((o) => o.books.includes(bookId)),
};

const actions = {
  ...crud.actions,
};
const mutations = {
  ...crud.mutations,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
