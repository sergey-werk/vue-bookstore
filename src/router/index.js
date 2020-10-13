import Vue from 'vue';
import VueRouter from 'vue-router';

import Error404 from '@/views/Error404Page.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', redirect: { name: 'Books' } },
  {
    path: '/books',
    name: 'Books',
    component: () => import(/* webpackChunkName: "books" */ '@/views/BooksPage'),
  },
  {
    path: '/books/:id',
    name: 'Book',
    props: (route) => ({ id: Number(route.params.id) }), // FIXME: ? a better way to cast a type
    component: () => import(/* webpackChunkName: "books" */ '@/views/BookInfo'),
  },
  {
    path: '/authors',
    name: 'Authors',
    component: () => import(/* webpackChunkName: "authors" */ '@/views/AuthorsPage'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutPage'),
  },
  {
    path: '*',
    component: Error404,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
