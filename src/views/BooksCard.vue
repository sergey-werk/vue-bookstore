<template>
  <b-card class="books-card" :img-src="item.image | base_url" img-alt="Book cover" img-top>
    <b-form-rating class="book-card-rating" inline readonly
      :value="item.rating"
      style=""
      no-border
      variant="warning"
      v-if="item.rating > 1"
      />
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
    <b-card-text />
    <template v-slot:footer>
        <div class="d-flex">
        <div>
          <small class="text-muted">ISBN-13: {{ item.isbn13 }}</small> <br/>
          <small class="text-muted">ISBN-10: {{ item.isbn10 }}</small>
        </div>
        <div class="ml-auto align-self-center">{{ item.price }}</div>
        </div>
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
  margin-top: 10px;
  object-fit: scale-down;
}

.card-title a {
  color: darkslategrey;
  text-decoration: none;
}

.book-card-rating {
  background-color:transparent;
  position: absolute;
  top: 0; left: 0;
}
</style>
