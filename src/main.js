import Vue from "vue";
import App from "./App.vue";
import store from './store'
import vuetify from './plugins/vuetify';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false;
Vue.component('v-select', vSelect.vSelect)

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
