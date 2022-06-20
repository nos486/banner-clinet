import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import VueMousetrapPlugin from 'vue-mousetrap/vue2'
Vue.use(VueMousetrapPlugin)

Vue.config.productionTip = false

//mixin
import Socket from "./mixins/Socket";
Vue.mixin(Socket)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
