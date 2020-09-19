<template>
<b-card class="book-card" :title=item.title
:img-src=item.image img-alt="Book cover" img-top>
  <b-card-text>
    {{ item.subtitle }}
  </b-card-text>
  <template v-slot:footer>
    <small class="text-muted">ISBN: {{ item.isbn13 }}</small> - {{ item.price }}
  </template>
</b-card>
</template>

<script>
// import { mapMutations, mapGetters } from 'vuex';

export default {
  props: ['item'],
};
</script>

<style scoped>
  .card-img-top {
    max-height: 350px;
    object-fit: scale-down;
    }
</style>
