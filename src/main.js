import Vue from 'vue';
import moment from 'moment';
import _ from 'lodash';
import App from './App.vue';
import router from './router';
import store from './store';
import Default from '@/layouts/Default.vue';
import Dashboard from '@/layouts/Dashboard.vue';
import Overview from '@/layouts/Overview.vue';
import Auth from '@/layouts/Auth.vue';
import Terms from '@/layouts/Terms.vue';
Vue.component('default-layout', Default);
Vue.component('dashboard-layout', Dashboard);
Vue.component('overview-layout', Overview);
Vue.component('auth-layout', Auth);
Vue.component('terms-layout', Terms);
import VueGtag from 'vue-gtag';

import './assets/css/bootstrap.min.css';
import './assets/css/styles.css';
import './assets/css/icons.css';

Vue.config.productionTip = false;

Vue.use(VueGtag, {
  config: { id: 'G-43MXZ4LYS4' },
});

import './mixins/auth';

import './filters/truncate';
import './filters/date';

// Register lodash
Vue.prototype._ = _;
Vue.prototype.moment = moment;

Vue.config.productionTip = false;

import VueToast from 'vue-toast-notification';
import VSelect from 'vue-select'

import 'vue-toast-notification/dist/theme-sugar.css';
import 'vue-select/dist/vue-select.css';
Vue.use(VueToast, {
  position: 'bottom-right',
});

Vue.component('v-select', VSelect);
new Vue({
  store,
  router,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  },
  render: (h) => h(App),
}).$mount('#app');
