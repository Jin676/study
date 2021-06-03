### scroll-view要点
    <scroll-view scroll-x="true" class="navScroll" enable-flex :current="navIndex">
    1、enable-flex不加这个flex不生效
    2、:current获取当前点击的id


### 使用koa搭建服务器

### 服务器端使用nodemon热加载
    nodemon代替node，启动命令nodemon server.js
    nodemon : 无法加载文件 D:\Program Files\nodejs\node_global\nodemon.ps1，因为在此系统上禁止运行脚本。有关详细信息，

    1.管理员身份打开powerShell

    2.输入Set-ExecutionPolicy -Scope CurrentUser
     RemoteSigned

### 小程序没有跨域问题，web有跨域
    web解决跨域使用代理
### h5和小程序发送请求区别
    h5会产生跨域，需要配置代理
    小程序需要编写完整路径和地址否则请求不到   

### h5发送请求得到数据后，for循环遍历数据，数据显示undefined
    vue模板解析要比发送块，模板解析时候没有发送请求数据是undefined，生命周期调用watcher-updater更新拿到数据后替换undefined数据
    使用v-if，但是不能和v-for一起用，v-for优先级更高优先使用，
    解决方法：放在父级元素身上

### 消除滚动条
    ::-webkit-scrollbar
			display none
			width 0
			height 0

### vuex
    computed:{
			...mapState({
				indexData:state=>state.home.indexData//映射过来的数据不需要初始化
			})
		},
    this.$store.dispatch("getIndexdataAction")

### vuex中为什么mutations中修改数据
    mutations中可以异步修改数据，但是不建议
    支持异步修改数据不可控，不可控会造成修改数据时候，自己想要修改的数据没修改成。


### flex元素上不去情况
    使用：inline-block行内块
    vertical-align top //让里面子元素向上对齐
    vertical-align middle //让里面子元素居中对齐

### 多行文本溢出隐藏
    display -webkit-box //使用webkit盒子
    -webkit-line-clamp 2 //clamp保持 只有2行
    -webkit-box-orient vertical //orient方向,vertical垂直
    text-overflow ellipsis
    overflow hidden


### 设置padding不生效
    box-sizing border-box//怪异盒模型，width===padding+width+border


### 设置文字左侧红色线条
    position定位到盒子内部left:0
    &.active::before
        position absolute
        left 0
        content ""
        width 4rpx
        height 60rpx
        background #882c08

    BUG:设置定位top后，active不生效，可以使用margin-top修改竖线位置    


### 分类页面左右联动
    右侧数据的位置需要根据左侧的navIndex和左侧数据，
    this.categoryList[this。clickId] //根据左侧数据的索引，获取得到数组中点击的那条对象
    //右侧数据是在左侧数据中的，computed中return 左侧数据[点击所在index] 就能得到右侧数组

    每行3个摆列：
        .shopList
				display flex
				flex-wrap wrap
				.shopItem
					width 30% //表示占父元素的30%的空间
					flex-shrink 1
					text-align center 
					align-items center

### 除了推荐其他导航页面布局一致，点击导航栏按钮，数据换成该页面
    创建cateList组件，放入到对应的index.vue中


### 省市县三级联动
    {
        "privinces":[
            id:111,
            name:'河北省'
        ],
        "cities":[
            id:1111,
            name:'邯郸市',
            parentId:111
        ],
        "counties:"[
            id:11111,
            name:"xxxx",
            parentId:1111
        ]
    }

### 用户唯一标识和登陆授权信息(不包括唯一标识)    
登陆授权：    
4.13以后更新版本的获取用户信息
绑定一个bindtap=" getUserProfile"事件然后
 getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        try {  wx.setStorageSync('userInfo', res.userInfo)} catch (e) { }
      },
      fail:(err)=>{
        console.log(err)
      }
    })
  },

授权后持续登陆方式：
onload中
 if (!wx.getStorageSync('userInfo')) {
      getUserProfile()
      return
    }else{
      this.setData({
        userInfo:wx.getStorageSync('userInfo')
      })
    }

授权退出：
loginOut(){
  this.setData({
    userInfo:""
  })
  wx.removeStorage({
    key: 'userInfo',
  })
},


用户唯一标识(支付或者私密数据等等)
wx.login(Object object)
调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息，包括用户在当前小程序的唯一标识（openid）、微信开放平台帐号下的唯一标识（unionid，若当前小程序已绑定到微信开放平台帐号）及本次登录的会话密钥（session_key）等。用户数据的加解密通讯需要依赖会话密钥完成。更多使用方法详见 小程序登录。
//获取用户登陆凭证code
wx.login({
    success(res)=>{
        console.log(res)//得到code
        let code =res.code
        //将code发送请求给服务器端
        //配置服务器端路由/getOpenId
        let token = await request("/api/getOpenId",{code})
		wx.setStorage("token",token)
    }
})

服务器端：
const Fly =require("flyio/src/node")
const fly = new Fly
const jwt = require("jsonwebtoken")
//获取用户的openId
	router.get("/getOpenId",async(ctx)=>{
		//1、接收请求参数，用户凭证
		let code = ctx.query.code //必须携带字段code,post请求则是body不是query
		//2、整合数据对接微信服务器,向微信发送请求
		let appId = "wxb68298c8062c4164"
		let AppSecret= "cdcc67686d97461aba9a1a58a95afd3a"
		let url =`GET https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`
		//wx不能用axios使用fly库，安装flyio
		
		//3、接收到微信服务器返回的数据，对当前用户数据进行自定义绑定，加密
		let result =await fly.get(url)
		let openId = JSON.parse(result.data).openid; //json字符串需要编译
		
		let userInfo = {
			openId,
			username:"curry",
			age:33
		}
		
		
		//jwt加密
		let token = jwt.sign(userInfo,"zdqwascv")//"zdqwascv"秘钥
		
		//接收到小程序发送的token，反编译
		 result = jwt.verify(token,"zdqwascv")
		//4、返回浏览器用户加密后的标识
		ctx.body = token
	})


//发送请求需要用户登录和cookie
    要求需要id