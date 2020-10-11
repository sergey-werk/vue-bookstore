<template>
  <b-card class="books-card" :img-src="item.image | base_url" img-alt="Book cover" img-top>
    <b-card-title>
      <router-link
        :to="{ name: 'Book', params: { id: item.id }}"
        class="stretched-link"
        event=""
        @click.native.prevent="onClick"
        >
        {{ item.title }}
      </router-link>
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
  methods: {
    onClick() {
      this.$emit('selected', { item: this.item });
    },
  },
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
