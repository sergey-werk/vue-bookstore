/* eslint-disable max-len */
<template>
  <section class="book-item" v-if="book">
    <header>
      <h1>{{ book.title }}</h1>
      <p class="book-authors" v-if="authors">
        by&nbsp;
        <span v-for="(author, i) in authors" :key="i">
        <span v-if="i>0">{{ ', ' }}</span>
        <router-link :to="`/authors/${author.id}`">
          {{ author.name }}
        </router-link>
        </span>
      </p>
      <p v-else>by&nbsp;{{ book.authors }}</p>
    </header>
    <p class="book-subtitle">
      {{ book.subtitle }}
    </p>

    <div class="d-flex flex-sm-row flex-column">
      <div class="book-cover flex-shrink-1">
        <img :src="book.image | base_url" alt="Book cover" />
      </div>
      <div class="mr-auto mt-auto mb-auto w-50 flex-column">
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
      authors: null,
    };
  },
  props: {
    id: Number, // FIXME: how to cast to int?
    bookObj: Object, // Pass object directly without calling getters.
  },
  computed: {
    ...mapGetters('books', ['getBookById']),
    ...mapGetters('authors', ['getAuthorsByBookId']),
  },
  methods: {
    getBook() {
      return this.bookObj ? this.bookObj : this.getBookById(this.id);
    },
    getAuthors() {
      return this.getAuthorsByBookId(this.book.id);
    },
  },
  async mounted() {
    this.book = this.getBook();

    if (!this.book) { // page opened with a direct link
      await this.$store.dispatch('books/fetchBooks');
      this.book = this.getBook();
    }
    const authors = this.getAuthors();
    if (!authors || !authors.lengh) { // authors not loaded
      await this.$store.dispatch('authors/fetchAuthors');
      this.authors = this.getAuthors();
    }
  },
  // TODO: fetch authors.
};
</script>

<style scoped>
.book-item {
  max-width: 50em;
}
.book-item label {
  margin-right: 1en;
  color: lightslategray;
}

.book-item .book-cover img {
  max-width:100%;
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
