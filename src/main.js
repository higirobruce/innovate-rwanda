import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Default from '@/layouts/Default.vue';
import Dashboard from '@/layouts/Dashboard.vue';
Vue.component('default-layout', Default);
Vue.component('dashboard-layout', Dashboard);
import './assets/css/bootstrap.min.css';
import './assets/css/styles.css';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

Vue.config.productionTip = false;


// Register fontawesome icons
library.add(fas);
library.add(fab);
Vue.component('icon', FontAwesomeIcon);

new Vue({
  store,
  router,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  },
  render: h => h(App),
}).$mount('#app');