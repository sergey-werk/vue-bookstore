<template>
  <section class="book-item" v-if="book">
    <header>
      <h1>{{ book.title }}</h1>
      <p class="book-authors" v-if="authors">
        by&nbsp;
        <span v-for="(author, i) in authors" :key="i">
        <span v-if="i>0">{{ ', ' }}</span>
        <router-link :to="`/authors/${author.id}`">{{ author.name }}</router-link>
        </span>
      </p>
      <p v-else>
        by {{ book.authors }}
        <b-spinner small label="Loading..." type="grow" v-if="authorsLoading" />
      </p> <!-- todo: show spinner when loading -->
    </header>
    <p class="book-subtitle">
      {{ book.subtitle }}
    </p>

    <div class="d-flex flex-sm-row flex-column">
      <div class="book-cover flex-shrink-1">
        <img :src="book.image | base_url" alt="Book cover" />
      </div>
      <div class="mr-auto mt-auto mb-auto flex-column">
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
  <section v-else-if="booksLoading">
    <b-spinner label="Loading..."/>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Book', // FIXME: ? is there any other way to prevent 'Anonymous component' in devtools?
  props: {
    id: Number, // FIXME: how to cast str to int here?
    bookObj: Object, // Pass an object directly, when including in templates.
  },
  data() {
    return {
      book: null,
      authors: null,
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
  computed: {
    ...mapGetters('books', {
      booksLoading: 'isLoading',
      getBookById: 'byId',
    }),
    ...mapGetters('authors', {
      authorsLoading: 'isLoading',
      getAuthorByBookId: 'byBookId',
    }),
  },
  async mounted() {
    this.book = this.bookObj || this.getBookById(this.id);

    if (this.book === undefined) { // like, if page was opened with a direct link.
      await this.$store.dispatch('books/fetch');
      this.book = this.getBookById(this.id);
    }

    const authors = this.getAuthorsByBookId(this.book.id);
    if (!authors || !authors.lengh) { // authors not loaded
      await this.$store.dispatch('authors/fetchAuthors');
      this.authors = this.getAuthorsByBookId(this.book.id); // retry
    }
  },
};
</script>
