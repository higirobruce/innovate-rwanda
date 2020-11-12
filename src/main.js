import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Default from '@/layouts/Default.vue';
Vue.component('default-layout', Default);
import './assets/css/bootstrap.min.css';
import './assets/css/styles.css';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  },
  render: h => h(App),
}).$mount('#app');