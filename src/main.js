import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Default from '@/layouts/Default.vue';
import Dashboard from '@/layouts/Dashboard.vue';
import Auth from '@/layouts/Auth.vue';
Vue.component('default-layout', Default);
Vue.component('dashboard-layout', Dashboard);
Vue.component('auth-layout', Auth);
import './assets/css/bootstrap.min.css';
import './assets/css/styles.css';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

Vue.config.productionTip = false;

import './mixins/auth';

import "./filters/truncate";
import "./filters/date";

// Register fontawesome icons
library.add(fas);
library.add(fab);
Vue.component('icon', FontAwesomeIcon);

import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
Vue.use(VueToast);

new Vue({
  store,
  router,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  },
  render: h => h(App),
}).$mount('#app');