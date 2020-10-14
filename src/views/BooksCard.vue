<template>
  <b-card
    class="books-card"
    :class="{'selected': item.selected }"
     >
    <div style="position:relative"> <!-- stretched-link outer box-->
      <b-img fluid center
        class="books-card-img"
        :src="item.image | base_url"
        alt="Book cover"
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
    </div>
    <template v-slot:header>
      <div class="d-flex" @click="onHeaderClicked(item)">
        <b-form-rating class="book-card-rating" inline readonly no-border
          :value="item.rating"
          v-if="item.rating > 0"
          />
        <b-form-checkbox
          v-model="item.selected"
          class="ml-auto p-2"
          />
      </div>
    </template>
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
import Vue from 'vue';

export default {
  name: 'BookCard',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onClick() {
      this.$emit('modal', { item: this.item });
    },
    onHeaderClicked(item) {
      Vue.set(item, 'selected', !item.selected);
    },
  },
};
</script>

<style scoped>
.books-card.selected {
  border-color: blue;
}

.books-card-img {
  max-height: 350px;
  object-fit: scale-down;
}

.card-header {
  padding: 0;
}

.card-title a {
  color: darkslategrey;
  text-decoration: none;
}
</style>
