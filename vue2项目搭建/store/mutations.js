import {SAVE_ADDRESS,SAVE_CATEGORYS,SAVE_SHOPLIST,SAVE_TOKEN,SAVE_USER,LOGOUT} from "./mutations_type"

export default{
    [SAVE_ADDRESS](state,address){
        state.address = address
    },
    [SAVE_CATEGORYS](state,categorys){
        state.categorys = categorys
    },
    [SAVE_SHOPLIST](state,shopList){
        state.shopList = shopList
    },
    [SAVE_TOKEN](state,token){
        state.token = token
    },
    [SAVE_USER](state,user){
        state.user = user
    },
    [LOGOUT](state){
      
        state.token =""
        state.user = {}
        localStorage.removeItem("token_key")
    },
    
}