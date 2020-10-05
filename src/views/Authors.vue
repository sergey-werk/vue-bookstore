<template>
  <div class="container-fluid content-row">
    <h1>Authors List</h1>
    <p>
      <b-input-group style="max-width: 12em">
        <b-form-input
          v-model="filter"
          type="search"
          id="filterInput"
          placeholder="Type to find"
        ></b-form-input>
        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
        </b-input-group-append>
      </b-input-group>
    </p>
    <b-table
      small
      class="authors-table"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      responsive="sm"
      sort-icon-left
      @filtered="onFiltered"
    >
      <template v-slot:cell(n_books)="data">
        <b-badge :variant="data.item.books.length > 1 ? 'info' : 'light'">
          {{ data.item.books.length }}</b-badge
        >
      </template>
    </b-table>
    <b-pagination
      v-show="totalRows > perPage"
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      size="sm"
    ></b-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      fields: [
        { key: 'name', label: 'Name', sortable: true },
        {
          key: 'n_books',
          label: 'Number of books',
          sortable: true,
          formatter: (value, key, item) => item.books.length,
          sortByFormatted: true,
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      filter: null,
    };
  },
  computed: {
    ...mapState('authors', ['items']),
  },
  mounted() {
    this.$store.dispatch('authors/fetchAuthors');
    this.totalRows = this.items.length; // To prevent delay with watch().
  },
  watch: {
    items(newValue) { // FIXME: ? Is there a better solution?
      if (!this.filter) {
        this.totalRows = newValue.length;
      }
    },
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>

<style scoped>
.authors-table >>> .b-table {
  width: auto !important;
  min-width: 20% !important;
}
</style>
