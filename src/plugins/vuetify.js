import Vue from "vue"
import Vuetify from "vuetify/lib"
import "vuetify/dist/vuetify.min.css"

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    light: true,
    themes: {
      light: {
        primary: '#2258f9',
        secondary: '#b0bec5',
        anchor: '#36477A',
        accent: '#112B7A',
      },
    },
  },
  icons: {
    iconfont: "mdiSvg", // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
})
