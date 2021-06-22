import Vue from 'vue'
import store from "./store"
import App from './App.vue'
import 'lib-flexible'
import "./veeValidate"
import "./mock/mockServe"
import * as API from "./api"
import router from "./router"
import HeaderTop from "./components/HeaderTop/HeaderTop.vue"
import i18n from './i18n'
Vue.component("HeaderTop",HeaderTop)
Vue.config.productionTip = false
Vue.prototype.$API = API

new Vue({
  render: h => h(App),
  router,
  i18n,
  store
}).$mount('#app')
