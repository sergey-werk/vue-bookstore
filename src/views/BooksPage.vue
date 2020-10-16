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
          v-model="filterTitle"
          type="search"
          placeholder="Type to find:"
          style="max-width: 10em"
          />
        <b-input-group-append>
          <b-button :disabled="!filterTitle" @click="filterTitle = ''">Clear</b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
    <div class="d-block p-0 mx-4" style="min-width: 20%; max-width: 100%;">
      <FilterByRange
        v-if="booksYears.length > 0"
        v-model="filterYear"
        :data="booksYears"
        :marks="filterYearMarks"
        >
        <span> Filter by year: </span>
      </FilterByRange>
    </div>
    <div class="d-block p-0 mx-4" style="min-width: 20%; max-width: 100%;">
      <FilterByRange
        v-if="booksPrices.length > 0"
        v-model="filterPrice"
        :data="booksPrices"
        :marks="filterPriceMarks"
        >
        <span> Filter by price: </span>
      </FilterByRange>
    </div>
  </div>

  <div class="d-flex justify-content-center mb-3" v-if="isBooksLoading">
    <b-spinner label="Loading..."></b-spinner>
  </div>

  <TheModalItem id="book-card-modal" size="lg">
    <Book :bookObj="modalBook" />
  </TheModalItem>

  <section v-show="filteredItems.length">
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
  <p v-show="this.items.length && !filteredItems.length"> No match found.</p>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import TheModalItem from '@/components/TheModalItem.vue';
import CrudTable from '@/components/CrudTable.vue';
import FilterByRange from '@/components/FilterByRange.vue';
import BooksCard from './BooksCard.vue';
import Book from './BookInfo.vue';

// eslint-disable-next-line no-extend-native, func-names
Number.prototype.between = function (a, b) {
  const min = Math.min.apply(Math, [a, b]);
  const max = Math.max.apply(Math, [a, b]);
  return this >= min && this <= max;
};

function forceNumber(val) {
  /** Strip non-numeric characters and convert to number. */
  return Number(String(val).replace(/[^0-9.-]+/g, ''));
}

export default {
  name: 'Books',
  data() {
    return {
      modalBook: null, // book in modal popup
      isListView: true, // TODO: move to state?, make url parameter
      listColumns: {
        title: 'Title',
        year: 'Published in (year)',
        price: 'Price',
      },
      filterTitle: '',
      filterYear: [-Infinity, Infinity],
      filterPrice: [0, Infinity],
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
    FilterByRange,
  },
  computed: {
    ...mapGetters('books', {
      isBooksLoading: 'isLoading',
      getBookById: 'byId',
      booksAttrUnique: 'attrUnique',
    }),
    ...mapState('books', ['items', 'selectedItems']),
    filteredItems() {
      return this.items
        .filter((item) => item.title.toLowerCase().includes(this.filterTitleStr))
        .filter((item) => Number(item.year).between(...this.filterYear))
        .filter((item) => forceNumber(item.price).between(...this.filterPrice));
    },
    filterTitleStr() {
      return this.filterTitle.trim().toLowerCase();
    },
    filterYearMarks() {
      const years = this.booksAttrUnique('year').map(Number);
      return years.length < 5 ? years : [];
    },
    booksYears() {
      return this.booksAttrUnique('year', Number).sort((a, b) => a - b);
    },
    booksPrices() {
      const prices = this.booksAttrUnique('price',
        (x) => Math.floor(forceNumber(x))).sort((a, b) => a - b);
      prices[prices.length - 1] += 1; // floor(49.99) -> 49, but we need 50 as an upper limit.
      return prices;
    },
    filterPriceMarks() {
      const [low, high] = this.filterPrice;
      return [low || '', Number.isFinite(high) ? high : ''];
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
