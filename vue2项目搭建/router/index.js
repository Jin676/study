import Vue from "vue"
import vueRouter from "vue-router"
import routes from "./routes"
Vue.use(vueRouter)

const router = new vueRouter({
    routes
})

export default router