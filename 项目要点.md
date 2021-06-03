### vue3 引入hooks报错
    不能使用@/路径，使用相对路径查找

### getCurrentInstance中ctx不能在生产模式使用
    封装函数
    function useCurrentInstance() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance
    const globalProperties = appContext.config.globalProperties
    return {
        globalProperties
    }
}
    使用：
    import useCurrentInstance from "../../hooks/useCurrentInstance";
    const { globalProperties } = useCurrentInstance();
    globalProperties中可以使用属性和方法


### swiper6关键
    要引入css，否则没有样式
    import"../../../public/css/swiper.css"
    如果没有2页，查看样式是不是flex导致的

### scroll报错
    元素标签报错，外层套一层if语句
    if(scroll2.value &&scroll1.value){
    left = new BScroll(scroll1.value, {
        probeType: 3,
        click: true,   
        })
### scroll横向滚动
    坑：BetterScroll 实现横向滚动，对 CSS 是比较苛刻的。首先你要保证 wrapper 不换行，并且 content 的 display 是 inline-block。

### vuex中commit报错
    interface ICtx{
        commit:Commit;
    }
    {commit}:ICtx //commit类型就是Commit
### login登陆
    input中type设置number后maxlength不生效，设置tel后生效


### 调用router方法
    //当前的router
    router.currentRoute.value.path !== "/login"

### 自动登陆
    app.vue
            //发送自动登陆请求
            let result = await globalProperties.$API.ReqAuto_login()
            //data中数据再次存到vuex
            store.commit(SAVE_USER,result.data)

    needToken字段是判断是否需要token      

    有token情况保存
    config.headers.authorization = token保存token
    没有则报错
    throw Error("登陆失败，请重新登陆")

### 出现unknown
    给报错的前面那个元素指定类型，例如type:Object  
### nextTick在vue3中在vue中获取的
    
### 商品详情页面后退，数据没有保留和+—一次2的问题
    left.refresh()刷新当前实例，解决+2问题
    页面后退(组件即将销毁)保存数据(onBeforeUnmount中将当前商店详情数据保存到sesstion中)
    sessionStorage.setItem("cateDatas",JSON.stringify(cateList.value))

    #不设置缓存组件，组件切换都会销毁，使用生命中期+session保存
### 刷新页面数据保留
    使用unload保留当前shoplist的数据，而不是所有+过的数据
    window.addEventListener("unload",()=>{
                 sessionStorage.setItem("cateDatas",JSON.stringify(cateList.value))
            })

### JSON.parse报错
    很可能是解析的数据是undefined    

### 数据持久化小坑
    购物车数据和控制+-不是一个数据，点击时候出问题(得到数据时候就解析JSON字符串，使用的就是同一个数据)

### 控制第一个商品+-，出现结果太长的结算消失
    例如：$23.221111111111111111太长导致布局错误
    computed返回的数据，初始化const price = ref
    watch监视数据返回

### sort方法会改变数组


### 点击列表切换到详情页
    列表标签：列表标签、列表id、详情页数据

### 字符串转换为number
    ts建议使用Number("xxxx")//不会报错   

### computed中set方法可以赋值数据 