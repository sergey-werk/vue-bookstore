/* eslint-disable max-len */
<template>
  <section class="book-item" v-if="book">
    <header>
      <h1>{{ book.title }}</h1>
      <p class="book-authors">by {{ book.authors }}</p>
    </header>
    <p class="book-subtitle">
      {{ book.subtitle }}
    </p>

    <div class="d-flex flex-sm-row flex-column">
      <div class="p-0">
        <img class="book-cover" :src="book.image | base_url" alt="Book cover" />
      </div>
      <div class="mr-auto p-4 mt-auto mb-auto flex-column">
        <p
          v-for="(field, key) in show_fields"
          :key="key"
          :class="`book-field book-${key}`"
        >
          <label v-if="field" :for="(field_id = `book-${book.id}-${key}`)"
            >{{ field }}:&nbsp;</label
          >
          <span class="book-field-value" :id="field_id">
            {{ book[key] }}
          </span>
        </p>
      </div>
    </div>
    <div>
      <p class="book-desc">
        {{ book.desc }}
      </p>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Book', // Prevent 'Anonymous component' in devtools.
  data() {
    return {
      book: null,
      show_fields: {
        price: 'Price',
        publisher: 'Published by',
        year: 'Year',
        language: 'Language',
        isbn10: 'ISBN-10',
        isbn13: 'ISBN-13',
        pages: 'Pages',
      },
    };
  },
  props: {
    id: Number, // FIXME: how to cast to int?
    bookObj: Object, // Pass object directly without calling getters.
  },
  computed: {
    ...mapGetters('books', ['getBookById']),
  },
  methods: {
    getBook() {
      return this.getBookById(this.id);
    },
  },
  mounted() {
    this.book = this.getBook();

    if (!this.book) { // page opened with a direct link
      this.$store.dispatch('books/fetchBooks').then(() => {
        this.book = this.getBook();
      });
    }
  },
  // TODO: fetch authors.
};
</script>

<style scoped>
.book-item {
  padding-left: 10%;
  max-width: 50em;
}
.book-item header {
  max-width: 80%;
}
.book-item label {
  margin-right: 1em;
  color: lightslategray;
}
.book-item .book-field {
  margin-bottom: 0;
}
.book-item .book-field-value {
  font-style: italic;
}

.book-item .book-subtitle {
  font-style: italic;
}

.book-item .book-price .book-field-value {
  font-weight: bolder;
}
</style>
