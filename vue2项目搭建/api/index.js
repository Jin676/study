import ajax from "./ajax"
//根据经纬度获取位置
export const getAddress = (latitude,longitude) => ajax({
  // params请求后面是动态的，:占位符的格式站位，所以我们后面不能写死
  url:`/position/${latitude},${longitude}`
})
//获取食品分类列表
export const ReqCategory = ()=>ajax({
  url:"/index_category",
})
//获取商铺列表
export const ReqShops = (latitude,longitude)=>ajax({
  url:`/shops`,
  // query请求,要写在params中
  params:{
    latitude,
    longitude
  },
  
})
//发送验证码
export const ReqSendcode= ({phone})=>ajax({
  url:`/sendcode`,
  // query请求,要写在params中
  params:{
    phone
  }
})
//用户名登陆
export const ReqPwdLogin= ({name,pwd,captcha})=>ajax({
  url:`/login_pwd`,
  method:"post",
  data:{
    name,
    pwd,
    captcha
  },
})
//短信登陆
export const ReqSmsLogin= ({phone,code})=>ajax({
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
  headers:{
    needToken:true
  }
})

//mock测试

export const RqeTest=()=>ajax({
    url:"/test2"
})

//商家数据接口
export const ReqShopDatas=()=>ajax({
    url:"/getShopDatas"
    
})