import Vue from 'vue';
import VueRouter from 'vue-router';

import Error404 from '@/views/Error404.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: { name: 'Books' } },
  {
    path: '/books',
    name: 'Books',
    component: () => import(/* webpackChunkName: "books" */ '@/views/Books'),
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
  { path: '*', component: Error404 },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
