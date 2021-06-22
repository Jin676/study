import axios from "axios"
import qs from "qs"
import router from "../router" //接收暴露出来的router对象
let instance = axios.create({
    baseURL: "/api" //发送请求前批量添加/api
})

instance.interceptors.request.use(config => {
    config.data = qs.stringify(config.data)
    let token = localStorage.getItem("token_key")
   
    if (config.headers.needToken) {
        if (token) {
            config.headers.authorization = token
        } else {
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
            // error后面注意写message不是reseponse
            alert("请先登录")
            if (router.currentRoute.path !== "/login") {
                router.replace("/login")
            }
        } else {
            if (error.response.status === 401) {
                alert("没有权限")
                if (router.currentRoute.path !== "/login") {
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
