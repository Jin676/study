import ajax from "./request"

interface IphoneCode{
    phone:number
}
interface ISmsLogin{
    phone:number 
    code:number
}
interface Imap{
    latitude:number
    longitude:number
}
interface IcateId{
    id:number
}
//金刚区
export const reqKingkong = ()=>ajax({
    url:"/index_category"
})
//根据经纬度获取位置
export const getAddress = <T>(latitude:T,longitude:T) => ajax({
    // params请求后面是动态的，:占位符的格式站位，所以我们后面不能写死
    url:`/position/${latitude},${longitude}`
  })

//获取商铺列表
export const ReqShops = <T>(latitude:T,longitude:T)=>ajax({
    url:`/shops`,
    // query请求,要写在params中
    params:{
      latitude,
      longitude
    }, 
  })
//获取商品
export const reqCate = ({id}:IcateId)=>ajax({
    url:"/food",
    params:{
        id
    }
})
//searchList
export const reqSearchList= ()=>ajax({
    url:"/search",
})
//ratings
export const reqRating= ({id}:IcateId)=>ajax({
    url:"/rating",
    params:{
        id
    }
})
//获取remen
export const reqHot = ()=>ajax({
    url:"/hot"
})
//发送短信验证码
export const reqSendCode = ({phone}:IphoneCode)=>ajax({
    url:"/sendcode",
    params:{phone}
})
//发送手机号和验证码登陆
export const ReqSmsLogin= ({phone,code}:ISmsLogin)=>ajax({
    //localhost:4000/sendcode?phone=13716962779)例子
    url:`/login_sms`,
    method:"POST",
    data:{
      phone,
      code
    }
  })
//自动登陆
  export const ReqAuto_login= ()=>ajax({
    url:'/auto_login',
    //判断请求是否需要token
    headers:{
      needToken:true
    }
  })
  

