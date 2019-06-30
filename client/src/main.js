import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueSweetalert2 from 'vue-sweetalert2';
import VueCurrencyFilter from 'vue-currency-filter'
import Animate from 'animate.css'
    

Vue.use(Buefy)
Vue.use(VueSweetalert2)
Vue.use(VueCurrencyFilter, {
  symbol : 'Rp',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})
Vue.use(require('vue-moment'));
Vue.use(Animate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')