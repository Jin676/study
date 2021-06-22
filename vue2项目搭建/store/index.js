import actions from "./actions"
import getters from "./getters"
import mutations from "./mutations"
import state from "./state"
import Vue from "vue"
import Vuex from "vuex"
import shop from "./modules/shop"
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        shop
    },
    state,
    mutations,
    actions,
    getters
})