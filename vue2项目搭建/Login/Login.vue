<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;"  :class="{on:isShow}" @click="isUserNameLogin(false)">短信登录</a>
          <a href="javascript:;" :class="{on:!isShow}"  @click="isUserNameLogin(true)">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:isShow}">
            <section class="login_message">
              <input name="phone" v-validate="'required|phone'" type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
              <!-- disabled禁止操作表单项 -->
              <button @click.prevent="" 
              :disabled="!btn_right_verification||counttime>0" 
              class="get_verification" 
              :class="{right_verification:btn_right_verification}"
              @click="sendCode"
              >{{counttime>0?`${counttime}后获取`:"获取验证码"}}</button>
            </section>
            <section class="login_verification">
              <input v-model="code" name="code" v-validate="'required|code'" type="tel" maxlength="6" placeholder="验证码">
              <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!isShow}">
            <section>
              <section class="login_message">
                <input v-model="name" name="name" v-validate="'required'" type="tel" maxlength="11" placeholder="手机/邮箱/用户名">
              <span style="color: red;" v-show="errors.has('name')">{{ errors.first('name') }}</span>
              </section>
              <section class="login_verification">
                <!-- 变量和判断直接写就行，不需要双引号 -->
                <input v-model="pwd" name="pwd" v-validate="'required'" :type="isShowPwd?'tel':'password'" maxlength="8" placeholder="密码">
                <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
                <div class="switch_button" :class="{on:isBtn}">
                  <div class="switch_circle" :class={right:isShowPwd} @click="btnAnm"></div>
                  <span class="switch_text">...</span>
                </div>
              </section>
              <section class="login_message">
                <input v-model="captcha" name="captcha" v-validate="'required'" type="text" maxlength="11" placeholder="验证码">
                <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
                <img ref="captcha" class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="reqCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="loggin">{{$t("login")}}</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
    <div class="languageContainer">
       <button @click="toggleLanguage('cn')">中文</button>
       <button @click="toggleLanguage('eu')">英文</button>
       <button @click="toggleLanguage('jp')">日文</button>
    </div>
  </div>
</template>

<script>
  export default {
   mounted(){
      this.$i18n.locale ="cn"
   },   
   data(){
      return {
        isShow:false,
        isBtn:false,
        isShowPwd:false,
        phone:"",
        counttime:0,
        code:"",
        name:"",
        pwd:"",
        captcha:""
      }
    },
   methods:{
     toggleLanguage(language){
      this.$i18n.locale = language // 一旦更新整个应用中所有的message都自动更新为en的版本
     },  
     reqCaptcha(){
        // 重点后面要用?xxx=yyy的query形式，而不能直接写否则报错404没找到资源
       this.$refs.captcha.src = `http://localhost:4000/captcha?time=`+Date.now()
     },
      isUserNameLogin(isShow){
         this.isShow = !isShow 
      },
      btnAnm(){
        this.isBtn = !this.isBtn
        this.isShowPwd = !this.isShowPwd
      },
     async sendCode(){
        //this.counttime = 5 放入到时候回调中会一直重置事件，不会往下继续计算
        this.counttime = 5
        let clearTime = setInterval(()=>{
            this.counttime--
            this.counttime === 0 && clearInterval(clearTime)
         },1000)
        let result = await this.$API.ReqSendcode({phone:this.phone}) 
        console.log(result);
      },
     async loggin(){
        let {isShow,name,pwd,phone,captcha,code} =this
        let names = !isShow?["name","pwd","captcha"]:["phone","code"]
         const success = await this.$validator.validateAll(names) // 对所有表单项进行验证
        if(success){
            let result
            if(!isShow){//密码登陆
              result = await this.$API.ReqPwdLogin({name,pwd,captcha})
              console.log(result)  
              if(result.code===1){
                alert("请输入正确的用户名密码验证码")
                this.reqCaptcha()
                this.captcha=""
              }
            }else{//手机登陆
              result = await this.$API.ReqSmsLogin({phone,code})
              if(result.code ===1){
                alert("验证码错误")
                this.code =""
              }
            }
            if(result.code === 0){
               alert("登陆成功")
               this.$router.replace("/profile")
               this.$store.dispatch("getuser",result.data)
            }
        }else{
          alert("前端验证失败")
        }
      }
     
   },
   computed:{
     btn_right_verification(){
       return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone)
     }
   }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_verification
                  color #333
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                transition all .5s
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  // transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  // 新添加一个类控制球滚动
                  &.right 
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
  .languageContainer       
    display flex  
    margin-top 50px
    justify-content space-around //环绕
</style>
