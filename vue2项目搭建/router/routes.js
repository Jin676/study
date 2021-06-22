//import Msite from "../pages/Msite/Msite.vue"
import Order from "../pages/Order/Order.vue"
import Profile from "../pages/Profile/Profile.vue"
import Search from "../pages/Search/Search.vue"
import Login from "../pages/Login/Login.vue"
import Shop from "../pages/Shop/Shop.vue"
import ShopGoods from "../pages/Shop/ShopGoods/ShopGoods.vue"
import ShopRatings from "../pages/Shop/ShopGoods/ShopRatings.vue"
import ShopInfo from "../pages/Shop/ShopGoods/Shopinfo.vue"

//路由组件懒加载 es10 import函数,跟正常引入路径只能存活一种
const Msite = () => import("../pages/Msite/Msite")
export default [
  {
      path:"/msite",
      component:Msite,
      meta:{
          isShowNav:true
      }
  },
  {
      path:"/order",
      component:Order,
      meta:{
        isShowNav:true
    }
  },
  {
      path:"/profile",
      component:Profile,
      meta:{
        isShowNav:true
    }
  },
  {
      path:"/search",
      component:Search,
      meta:{
        isShowNav:true
    }
  },
  {
      path:"/login",
      component:Login,
      meta:{
        isShowNav:false
    }
  },
  {
    path:"/shop",
    component:Shop,
    meta:{
      isShowNav:true
  },
  children: [
    {
      path: '/shop/goods',
      component: ShopGoods
    },
    {
      path: '/shop/ratings',
      component: ShopRatings
    },
    {
      path: '/shop/info',
      component: ShopInfo
    },
    {
      path: '/indexPage',
      component: ShopInfo
    },
    {
      path: '',
      redirect: '/shop/goods'
    }
  ]

  },
  {
     path:"/",
     redirect:"/login"
  }
]