import Vue from 'vue'
import App from './App.vue'
import router from "@/router";

import Chartkick from 'vue-chartkick';
import Chart from 'chart.js';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { VueSpinners } from "@saeris/vue-spinners";

Vue.use(Chartkick.use(Chart));
Vue.use(VueSpinners);
Vue.use(VueSweetalert2)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

