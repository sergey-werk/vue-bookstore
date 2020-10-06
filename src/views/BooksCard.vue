<template>
  <b-card class="books-card" :img-src="item.image" img-alt="Book cover" img-top>
    <b-card-title>
      <a
        href="#"
        @click.prevent="add($event)"
        @click="$bvModal.show('item-card-modal')"
        class="stretched-link"
        v-b-modal.item-card-modal
      >
        {{ item.title }}
      </a>
    </b-card-title>
    <b-card-sub-title>
      {{ item.subtitle }}
    </b-card-sub-title>
    <b-card-text> </b-card-text>
    <template v-slot:footer>
      <small class="text-muted">ISBN: {{ item.isbn13 }}</small> -
      {{ item.price }}
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
  margin-bottom: -20px;
  object-fit: scale-down;
}

.card-title a {
  color: darkslategrey;
  text-decoration: none;
}
</style>
