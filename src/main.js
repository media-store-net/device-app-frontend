import Vue from 'vue'
import App from './App.vue'
import makeStore from './store'
import router from './router'

import vSelect from 'vue-select'
import './plugins/vue-select'
import vuetify from './plugins/vuetify'
import VModal from 'vue-js-modal'

Vue.use(VModal)
Vue.config.productionTip = false

/**
 * @description new Vue App
 */
export const app =  new Vue({
	store: makeStore(),
	router,
	vuetify,
	components: {vSelect},
	render: (h) => h(App)
}).$mount('#app')
