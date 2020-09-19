<template>
<div class="books-catalog container-fluid content-row">
  <h1>Books Catalog</h1>
  <p>
    <b-form-checkbox v-model="listView" name="check-button" switch>
      List view
    </b-form-checkbox>
  </p>
  <div class="row" v-if="!listView">
    <div
      v-for="item in items"
      :key="item.id"
      class="col-xs-12 col-sm-6 col-md-4 col-lg-3 d-flex"
    >
      <BookCard
      :item="item"
      class="w-100 mb-4"
      ></BookCard>
    </div>
  </div>

  <table class="table" v-else-if="listView">
    <thead>
      <tr>
        <th>Артикул</th>
        <th>Название</th>
        <th>Цена</th>
      </tr>
    </thead>
    <tbody>
      <BookRow
        :item="item"
        v-for="item in items"
        :key="item.id"
      ></BookRow>
    </tbody>
  </table>
</div>
</template>

<script>
import { mapState } from 'vuex';
import BookRow from './BooksRow.vue';
import BookCard from './BookCard.vue';

export default {
  data() {
    return {
      listView: false,
    };
  },
  components: {
    BookRow,
    BookCard,
  },
  computed: {
    ...mapState('catalog', ['items']),
  },
  mounted() {
    this.$store.dispatch('catalog/GET_ITEMS');
  },
};
</script>

<style scoped>

</style>
