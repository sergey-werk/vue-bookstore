<template>
  <div class="items-catalog container-fluid content-row">
    <h1>Books Catalog</h1>
    <p>
      <b-form-checkbox v-model="listView" name="check-button" switch>
        List view
      </b-form-checkbox>
    </p>
    <p>
      <b-button variant="success"><b-icon icon="plus-circle" /> Add </b-button>
    </p>
    <TheModalItem id="item-card-modal" title="Default Title"></TheModalItem>
    <div class="row" v-if="!listView">
      <div
        v-for="item in items"
        :key="item.id"
        class="item-card col-xs-12 col-sm-6 col-md-4 d-flex"
      >
        <BooksCard :item="item" class="w-100 mb-4"></BooksCard>
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
        <BooksRow :item="item" v-for="item in items" :key="item.id"></BooksRow>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TheModalItem from '@/components/TheModalItem.vue';
import BooksRow from './BooksRow.vue';
import BooksCard from './BooksCard.vue';

export default {
  data() {
    return {
      listView: false,
    };
  },
  components: {
    BooksRow,
    BooksCard,
    TheModalItem,
  },
  computed: {
    ...mapState('catalog', ['items']),
  },
  created() {
    this.$store.dispatch('catalog/GET_ITEMS');
  },
};
</script>

<style scoped>
@media (min-width: 1100px) {
  .item-card {
    flex: 0 0 350px !important;
  }
}
.b-icon {
  margin-right: 0.3em;
}
</style>
