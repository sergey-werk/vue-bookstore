<!-- Here we use our own BooksTable component. -->
<template>
  <div>
    <h1>Books</h1>
    <div class="d-flex flex-row flex-wrap mb-3 books-catalog-controls">
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

    <div class="py-4 d-flex flex-row flex-wrap">
      <div>
        <b-input-group>
          <b-form-input
            v-model="filter"
            type="search"
            placeholder="Type to find:"
            style="max-width: 10em"
            />
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
      </div>

      <div class="d-block p-0 mx-4" style="min-width: 20%; max-width: 100%;">
        <span>Filter by year:</span>
        <vue-slider
          v-model="filterYears"
          v-if="getBooksYears.length > 0"
          :data="getBooksYears"
          :marks="filterYearsMarks"
          :enable-cross="false"
          :lazy="true"
          :adsorb="true"
          />
      </div>
    </div>

    <div class="d-flex justify-content-center mb-3" v-if="isBooksLoading">
      <b-spinner label="Loading..."></b-spinner>
    </div>

    <TheModalItem id="book-card-modal" size="lg">
      <Book :bookObj="modalBook" />
    </TheModalItem>

    <section v-show="!!filteredItems">
      <!-- Card view -->
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
      <!-- List view -->
      <div v-else-if="isListView">
        <CrudTable
          :rows=filteredItems
          key_field="id"
          :columns="listColumns"
          />
      </div>
    </section>
    <p v-show="!!filterStr & filteredItems.length == 0"> No match found.</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

import TheModalItem from '@/components/TheModalItem.vue';
import CrudTable from '@/components/CrudTable.vue';
import BooksCard from './BooksCard.vue';
import Book from './BookInfo.vue';

// eslint-disable-next-line no-extend-native, func-names
Number.prototype.between = function (a, b) {
  const min = Math.min.apply(Math, [a, b]);
  const max = Math.max.apply(Math, [a, b]);
  return this >= min && this <= max;
};

export default {
  name: 'Books',
  data() {
    return {
      modalBook: null, // book in modal popup
      isListView: true, // TODO: move to state?, make url parameter
      filter: '',
      listColumns: {
        title: 'Title',
        year: 'Published in (year)',
        price: 'Price',
      },
      filterYears: [-Infinity, Infinity], // from, to
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
    VueSlider,
  },
  computed: {
    ...mapGetters('books', {
      isBooksLoading: 'isLoading',
      getBookById: 'byId',
      getBooksYears: 'years',
    }),
    ...mapState('books', ['items', 'selectedItems']),
    filterStr() {
      return this.filter.trim().toLowerCase();
    },
    filteredItems() {
      return this.items
        .filter((item) => item.title.toLowerCase().includes(this.filterStr))
        .filter((item) => Number(item.year).between(...this.filterYears));
    },
    filterYearsDefault() {
      return [Math.min(...this.getBooksYears), Math.max(...this.getBooksYears)];
    },
    filterYearsMarks() {
      return this.getBooksYears.length < 5 ? this.getBooksYears : [];
    },
  },
  watch: {
    filterYearsDefault() {
      console.log('filterYearsDefault changed!', this.filterYearsDefault, '_', this.filterYears);
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
