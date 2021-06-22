### 目录规范
    components  组件目录 将uni-ui组件uni_modules文件夹复制到下面
    static  静态资源目录主要是img和icon等等
    Pages   页面目录
    Data    测试数据目录
    Mixins  混合
    Common 公共目录 
        css 公共的scss文件放入到这里，再在uni.scss中引入
        js  module.exports暴露该模块,main.js中引入

### 小程序秘钥和id
    id：wxb68298c8062c4164
    AppSecret(小程序密钥)：cdcc67686d97461aba9a1a58a95afd3a
### 全局样式(css)和全局工具类(js)
    scss全局挂载:
    $xxx:yyy 定义变量
    @import "url地址"//引入文件
    使用 font-size:$test-font-size-base;(变量名)

    js全局挂载(不支持nvue)：
    common/js/hook.js
    Vue.prototype.xxx=xxx
    this.$utools.debounce(xxx)

### 书写要点
    1、rpx布局
    2、组件使用
        长列表用nvue的list组件，app墙瀑布流使用nvue的watefall组件
    3、尽量使用class选择器样式
    4.兼容性避免
    5、flex布局+定位布局    

### nvue注意点
    1、nvue页面控制显隐只可以使用v-if不可以使用v-show
    2、nvue页面只能使用flex布局，不支持其他布局
    3、nvue页面布局排列方向默认竖排
    4、文字内容、必须只能在<text>组件下
    5、不支持背景图
    6、css选择器支持的比较少、只能使用class选择器
    7、class进行绑定只支持数组语法
    8、在app.vue中定义全局js，nvue不会生效，globalData和vuex是生效的
    9、不支持百分比布局
    10、nvue没有层级概念，不能用z-index调整图层

### 组件注册和引用(Easycom)
    传统vue组件，需要安装、注册、引用，Easycom合并为一个
    只需要组件安装在项目的components目录下，并符合components/组件名/组件名称vue/目录结构
    就可以不用引用、注册、直接在页面中使用

### easycom配置
"easycom": {
	  "autoscan": true,
	  "custom": {
          //uni-ui
	    "^uni-(.*)": "@/components/uni_modules/uni-$1/components/uni-$1/uni-$1.vue", 
        // 匹配components目录内的vue文件
	    "^vue-file-(.*)": "packageName/path/to/vue-file-$1.vue" // 匹配node_modules内的vue文件
	  }
	}
    注释：当前项目(uni-ui层级演示)
    components
        uni_modules
            uni-badge($1代替-的后面)
                components
                    uni-badge
                     uni-badge.vue
    uni-$1：$1是不确定的名字文件夹
    uni-$1.vue： 不确定的vue文件

    注意点：components/Banner/Banner.vue //easycom在这目录下不需要引入直接可以使用，自动配置的
### u-viewui
    1、uview-ui文件夹放入根目录
    2、uni.scss引入样式@import 'uview-ui/theme.scss'; 
    3、main.js
        import uView from "uview-ui";
        Vue.use(uView);
    4、配置easycom    
        "easycom": {
			"^u-(.*)": "@/uview-ui/components/u-$1/u-$1.vue"
		}

### h5配置代理
创建vue.config.js
module.exports={
	  //vue-cli3.0 里面的 vue.config.js做配置
	devServer: {
	    proxy: {
	        '/api': {     //这里最好有一个 /
	            target: 'http://localhost:4000',  // 后台接口域名
	            ws: true,        //如果要代理 websockets，配置这个参数
	            secure: false,  // 如果是https接口，需要配置这个参数
	            changeOrigin: true,  //是否跨域
	            pathRewrite:{
	                '^/api':''
	            }
	        }
	    }
	  }
}
发送请求：/api/xxx

### tabBar要点
    注意：路径千万别带中文，img图片都改成英文否则报错
    tabBar跳转：只能用swichto和reLaunch

### 真机调试
    注意：如果没检测到设备
    找到下面文件D:\Archive\HBuilderX\plugins\launcher\tools\adbs
    将1.0.31中的文件取出，覆盖adbs

### swiper
    默认高度：150px或者300rpx
    image图片mode模式：
    当src为动态引用时，路径一定要改为组件所在页面的相对路径，填坑完毕
### scroll-view要点
    <scroll-view scroll-x="true" class="navScroll" enable-flex :current="navIndex">
    1、enable-flex不加这个flex不生效
    2、:current获取当前点击的id
    3、不写vh就不会出现滚动条问题，写vh就会出现滚动条问题
    4、border属性transparnt透明的，可以给边框添加
    5、如果希望页面高度铺满，需要减去navbar(44px)，如在tabbar页面，再减去tabbar高度(50px)
### 中间竖线和商品中间的竖线
    box-shadow: 0 0 6rpx #eee; 点击后10rpx

### 跳转页面传参设置标题
    :url="`../goods-list/goods-list?navId=${navId}`" //双引号在外边,``在里面
    页面跳转传参：参数可以在onload中获取


### 自定义头部导航栏
    "navigationStyle":"custom" //自定义头部导航栏，也是取消头部导航

    取消导航栏后，真机情况下app端状态栏会被盖住，不要盖住写的代码显示：
    <view class="status_bar">  
	</view>
    .status_bar {
      height: var(--status-bar-height);
      width: 100%;
     }

### 条件编译
    #ifdef APP-PLUS //app平台
    #endif 
    #ifdef H5  //h5平台
    #endif 
    #ifdef MP-WEIXIN //微信
    #endif 

### 100%高度设置让页面不滑动
    #ifdef APP-PLUS //app平台
    height:calc(100vh - 188rpx - 64rpx); //这是减tabbar-nav导航栏-搜索框
    #endif 

    #ifdef H5  //h5平台
    height:calc(100vh - 188rpx - 64rpx);  //减去tabbar和navlocation头部导航栏
    #endif 

### 禁止app端自带的页面回弹
    配置到page.json的对应style中
    "app-plus":{
					// 将回弹属性关掉
					"bounce":"none"
				}
### 预览图片
         urls:this.urls,//图片路径，要写数组，里面都是图片["dianshi.png","shexiangji.png"]这样的格式
         current:this.swiperId,//配置当前图片
    @handleImg(){
    uni.previewImage({
				            urls:this.urls,
							current:this.swiperId,
                            indicator:"number",//预览图片当前第几张，模拟器不显示，手机会显示
				            longPressActions: {
				                itemList: ['发送给朋友', '保存图片', '收藏'],
				                success: function(data) {
				                    console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				                },
				                fail: function(err) {
				                    console.log(err.errMsg);
				                }
				            }
				        });
    }

### 弹出层
    u-popup打开弹出层

### 下拉刷新和上拉加载
        1、pages.json中"enablePullDownRefresh": true，开启下拉事件
        onPullDownRefresh() {//触发下拉刷新
            console.log('refresh');

            setTimeout(function () {
                uni.stopPullDownRefresh();//处理完业务，需要停止当前页面下拉刷新
            }, 1000);
        }

        
        data中的page:1
        onReachBottom() {//触底加载
            this.page++;
            if(this.page >=5)return false //下拉5次以后不能再下拉
            const newList = news.getxxx()
            let listnew =newlist
            this.list.push(...listnew)
            
        },

        //scroll方法中scrolltolower也可以下拉触底触发,
        //scroll方法中scrolltoupper也可以上拉刷新
        //var(-window-top)到头部0
        
### uniapp打开第三方网站
    路由跳转url:写下面子组件地址

    新建一个子组件
    <web-view src=""url><web-view>//web-view组件

    data(){
        return{
            url:“”
        }
    }，
    onload(e){
        this.url = e.url || "";
        //e是跳转页面的query参数
        uni.setNavigationBarTitle({
            title:'标题名'
        })
    }

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

