import Vue from 'vue'
import App from './App.vue'
import store from './store'

import vSelect from 'vue-select'
import './plugins/vue-select'
import vuetify from './plugins/vuetify'
import VModal from 'vue-js-modal'
import router from './router'

Vue.use(VModal)
Vue.config.productionTip = false

/**
 * @description new Vue App
 */
new Vue({
 store,
 vuetify,
 components: { vSelect },
 router,
 render: (h) => h(App)
}).$mount('#app')
