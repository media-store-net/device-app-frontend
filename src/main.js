import Vue from 'vue'
import App from './App.vue'
import store from './store'

import vSelect from 'vue-select'
import './plugins/vue-select'
import vuetify from './plugins/vuetify'
import VModal from 'vue-js-modal'

Vue.use(VModal)
Vue.config.productionTip = false

/**
 * @description new Vue App
 */
new Vue({
  store,
  vuetify,
  components: { vSelect },
  render: (h) => h(App),
}).$mount('#app')
