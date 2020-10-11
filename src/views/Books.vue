<template>
  <div>
    <h1>Books</h1>
    <div class="d-flex mb-3 books-catalog-controls">
      <div class="m-2">
        <b-button variant="success">
          <b-icon icon="plus-circle" /> Add&nbsp;
        </b-button>
      </div>
      <div class="m-2 p-2">
        <b-form-checkbox v-model="listView" name="check-button" switch>
          List view
        </b-form-checkbox>
      </div>
    </div>
    <div class="d-flex justify-content-center mb-3" v-if="booksLoading">
      <b-spinner label="Loading..."></b-spinner>
    </div>

    <TheModalItem id="book-card-modal" size="lg" >
      <Book :bookObj="modalBook" />
    </TheModalItem>

    <div class="row" v-if="!listView">
      <div
        v-for="book in items"
        :key="book.id"
        class="book-card col-xs-12 col-sm-6 col-md-4 d-flex"
      >
        <BooksCard :item="book" class="w-100 mb-4" @selected="onSelected"></BooksCard>
      </div>
    </div>

    <table class="table" v-else-if="listView">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <BooksRow :item="book" v-for="book in items" :key="book.id"></BooksRow>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import TheModalItem from '@/components/TheModalItem.vue';
import BooksRow from './BooksRow.vue';
import BooksCard from './BooksCard.vue';
import Book from './Book.vue';

export default {
  name: 'Books',
  data() {
    return {
      modalBook: null, // book in modal popup
      listView: false, // TODO: move to state, make url parameter
    };
  },
  methods: {
    onSelected({ item }) {
      this.modalBook = item;
      this.$bvModal.show('book-card-modal');
    },
  },
  components: {
    BooksRow,
    BooksCard,
    TheModalItem,
    Book,
  },
  computed: {
    ...mapGetters('books', {
      booksLoading: 'isLoading',
      getBookById: 'byId',
    }),
    ...mapState('books', ['items', 'selectedItems']),
  },
  mounted() {
    if (!this.items.length) {
      this.$store.dispatch('books/fetch');
    }
  },
};
</script>

<style scoped>
@media (min-width: 1100px) {
  .book-card {
    flex: 0 0 350px !important;
  }
}
.b-icon {
  margin-right: 0.3em;
}
</style>
