import {SAVE_ADDRESS,SAVE_CATEGORYS,SAVE_SHOPLIST,SAVE_TOKEN,SAVE_USER} from "./mutations_type"
import {getAddress,ReqCategory,ReqShops} from "../api"
import Vue from "vue"
export default{
    async getAddressA({commit}){
        // 不能这样写这不是vue组件
        // let result = await this.$API.getAddress(40,110)
        // console.log(result);
          let result = await getAddress(40,110)
         !!(result.code === 0) && commit(SAVE_ADDRESS,result.data)
    },
    async getCategory({commit}){
        let result = await ReqCategory()
         !!(result.code === 0) && commit(SAVE_CATEGORYS,result.data)
    },
    async getShops({commit}){
        let result = await ReqShops()
         !!(result.code === 0) && commit(SAVE_SHOPLIST,result.data)
    },
    async getuser({commit},user){
        commit(SAVE_TOKEN,user.token)
        localStorage.setItem("token_key",user.token)
        delete user.token 
        commit(SAVE_USER,user)
    }, 
   

}