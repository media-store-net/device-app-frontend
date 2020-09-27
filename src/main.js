import Vue from "vue";
import App from "./App.vue";
import vSelect from "vue-select"
import store from './store'

import vuetify from './plugins/vuetify';
import './plugins/vue-select';

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  components: { vSelect },
  render: h => h(App)
}).$mount("#app");