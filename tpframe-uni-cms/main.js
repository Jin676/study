import Vue from 'vue'
import App from './App'
import Helper from './common/js/helper'
import Request from './common/js/request'

Vue.config.productionTip = false

Vue.prototype.$Helper = Helper;
Vue.prototype.$Request = Request;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
