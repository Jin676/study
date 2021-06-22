import axios from "axios"
import qs from "qs"
import router from "../router" //接收暴露出来的router对象
const instance = axios.create({
    baseURL:"/api"
})

instance.interceptors.request.use(config => {
    config.data = qs.stringify(config.data)
    let token = localStorage.getItem("token_key")
    if (config.headers.needToken) {
        if (token) {
            config.headers.authorization = token
        } else {
            //刚上来没有token走这边
            throw Error("登陆失败，请重新登陆")
        }
    }
    return config
})

instance.interceptors.response.use(
    response => response.data,
    error => {
        console.log(error);
        if (!error.response) {
            //发送请求前就报错了
            alert("请先登录")
            if (router.currentRoute.value.path !== "/login") {
                router.replace("/login")
            }
        } else {
            //发送请求后接收的各种错误
            if (error.response.status === 401) {
                alert("没有权限")
                if (router.currentRoute.value.path !== "/login") {
                    router.replace("/login")
                }
            } else if (error.response.stutas === 404) {
                alert("没有找到资源")
            } else {
                alert("请求错误")
            }
        }


        return new Promise(() => { })
    }

)

export default instance