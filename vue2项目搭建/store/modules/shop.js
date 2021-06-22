import Vue from "vue"
import { SAVE_SHOPDATAS,ADD_COUNT,DEL_COUNT,CLEAR_CARTSHOPS,SAVE_CARTSHOPS} from "../mutations_type"
import { ReqShopDatas } from "../../api"
const state = {
    initTest: "模块话vuex第一次使用",
    shopDatas: {},
    cartSops:[],
    
}
const actions = {
    async getShopDataAction({ commit }) {
        let result = await ReqShopDatas()
        if (result.code === 0) {
            commit(SAVE_SHOPDATAS, result.data)
        }

    },
    async getCountActionjia({commit},{isAdd,food}){
        if(isAdd){
            commit(ADD_COUNT,{food})
        }else{
          
            commit(DEL_COUNT,{food})
        }
   }, 
  

}
// 名字要写对否则报错
const mutations = {
    [SAVE_SHOPDATAS](state, shopDatas) {
        state.shopDatas = shopDatas
    },
    [ADD_COUNT](state,{food}){
        if(food.count > 0){
            food.count++
        }else{
            Vue.set(food,"count",1)
            state.cartSops.push(food)
        }
    },
    [DEL_COUNT](state,{food}){
        if(food.count > 0){
            food.count--
          if(food.count === 0 ){
            //   indexOf找数组中元素删除
            state.cartSops.splice(state.cartSops.indexOf(food),1)
          }
        }
    },
    [CLEAR_CARTSHOPS](state){
        state.cartSops.forEach(food=>{
          return food.count = 0
        })
        state.cartSops = []
    },
    [SAVE_CARTSHOPS](state,cartShops){
        
        state.cartSops = cartShops
    }
}
const getters = {
  totalCount(state){
      return state.cartSops.reduce((pre,food)=>{
         return pre += food.count
      },0)
  },
  totalPrice(state){
   return state.cartSops.reduce((pre,food)=>{
       //food.count数量 ，food.price 单价
     return pre += food.count * food.price 
   },0)
  }
}
export default {
    state,
    actions,
    mutations,
    getters
}