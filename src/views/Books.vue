<template>
  <div class="books-catalog container-fluid content-row">
    <h1>Books Catalog</h1>
    <p>
      <b-form-checkbox v-model="listView" name="check-button" switch>
        List view
      </b-form-checkbox>
    </p>
    <p>
      <b-button variant="success"><b-icon icon="plus-circle" /> Add </b-button>
    </p>
    <TheModalItem id="book-card-modal" size="md" >
      <Book :bookObj="selectedBook" />
    </TheModalItem>
    <b-spinner label="Loading..." v-if="this.$store.state.loading"></b-spinner>
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
import { mapState } from 'vuex';
import TheModalItem from '@/components/TheModalItem.vue';
import BooksRow from './BooksRow.vue';
import BooksCard from './BooksCard.vue';
import Book from './Book.vue';

export default {
  data() {
    return {
      listView: false,
      selectedBook: null,
    };
  },
  methods: {
    onSelected({ item }) {
      this.selectedBook = item;
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
    ...mapState('books', ['items']),
  },
  mounted() {
    if (!this.items.length) {
      this.$store.dispatch('books/fetchBooks');
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
