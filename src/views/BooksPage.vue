<!-- Here we use our own BooksTable component. -->
<template>
  <div>
    <h1>Books</h1>
    <div class="d-flex mb-3 books-catalog-controls">
      <div class="m-2">
        <b-button variant="success">
          <b-icon icon="plus-circle" /> Add
        </b-button>
      </div>
      <div class="m-2 p-2">
        <b-form-checkbox v-model="isListView" name="check-button" switch>
          List view
        </b-form-checkbox>
      </div>
    </div>

    <p>
      <b-input-group style="max-width: 12em">
        <b-form-input
          v-model="filter"
          type="search"
          placeholder="Type to find:"
        ></b-form-input>
        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
        </b-input-group-append>
      </b-input-group>
    </p>

    <div class="d-flex justify-content-center mb-3" v-if="isBooksLoading">
      <b-spinner label="Loading..."></b-spinner>
    </div>

    <TheModalItem id="book-card-modal" size="lg">
      <Book :bookObj="modalBook" />
    </TheModalItem>

    <section v-show="!!filteredItems">
      <div class="row" v-if="!isListView">
        <div
          class="book-card col-xs-12 col-sm-6 col-md-4 d-flex"
          v-for="book in filteredItems"
          :key="book.id"
        >
          <BooksCard
            class="w-100 mb-4"
            :item="book"
            @modal="onModal"
          />
        </div>
      </div>
      <div v-else-if="isListView">
        <CrudTable
          :rows=filteredItems
          key_field="id"
          />
      </div>
    </section>
    <p v-show="!!filterStr & filteredItems.length == 0"> No match found.</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import TheModalItem from '@/components/TheModalItem.vue';
import CrudTable from '@/components/CrudTable.vue';
import BooksCard from './BooksCard.vue';
import Book from './BookInfo.vue';

export default {
  name: 'Books',
  data() {
    return {
      modalBook: null, // book in modal popup
      isListView: true, // TODO: move to state?, make url parameter
      filter: '',
    };
  },
  methods: {
    onModal({ item }) {
      this.modalBook = item;
      this.$bvModal.show('book-card-modal');
    },
  },
  components: {
    CrudTable,
    BooksCard,
    TheModalItem,
    Book,
  },
  computed: {
    ...mapGetters('books', {
      isBooksLoading: 'isLoading',
      getBookById: 'byId',
    }),
    ...mapState('books', ['items', 'selectedItems']),
    filterStr() {
      return this.filter.trim().toLowerCase();
    },
    filteredItems() {
      return this.items.filter((item) => item.title.toLowerCase().includes(this.filterStr));
    },
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
