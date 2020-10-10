import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

Vue.filter('base_url', (value) => {
  let url = process.env.BASE_URL + value;
  url = url.split('/').filter((x) => x).join('/'); // '//' -> '/'
  return `/${url}`;
});

new Vue({
  router,
  store,
  render(h) {
    return h(App);
  },
}).$mount('#app');
