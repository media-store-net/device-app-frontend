/** @format */

import Vue from "vue"
import App from "./App.vue"
import vSelect from "vue-select"
import store from "./store"

import vuetify from "./plugins/vuetify"
import "./plugins/vue-select"

import VModal from "vue-js-modal"

Vue.config.productionTip = false
Vue.use(VModal)

new Vue({
  store,
  vuetify,
  components: { vSelect },
  render: (h) => h(App),
}).$mount("#app")
