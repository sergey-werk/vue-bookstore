import Vue from 'vue';
import VueRouter from 'vue-router';

import Error404 from '@/views/Error404.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', redirect: { name: 'Books' } },
  {
    path: '/books',
    name: 'Books',
    component: () => import(/* webpackChunkName: "books" */ '@/views/Books'),
  },
  {
    path: '/books/:id',
    name: 'Book',
    props: (route) => ({ id: Number(route.params.id) }), // FIXME: ? a better way to cast a type?
    component: () => import(/* webpackChunkName: "books" */ '@/views/Book'),
  },
  {
    path: '/authors',
    name: 'Authors',
    component: () => import(/* webpackChunkName: "authors" */ '@/views/Authors'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About'),
  },
  {
    path: '/404',
    name: '404',
    component: Error404,
  },
  {
    path: '*',
    redirect: '/404',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
