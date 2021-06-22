<template>
<footer class="footer_guide">
    <span class="guide_item" @click="goto(`/msite`)" :class="{on:isGreen(`/msite`)}">
        <span>
            <i class="iconfont iconicon4"></i>
        </span>
        <span>首页</span>
    </span>
    <span class="guide_item"  @click="goto(`/search`)" :class="{on:isGreen(`/search`)}">
        <span>
            <i class="iconfont iconsousuo"></i>
        </span>
        <span>搜索</span>
    </span>
    <span class="guide_item"  @click="goto(`/order`)" :class="{on:isGreen(`/order`)}">
        <span>
            <i class="iconfont icondingdan"></i>
        </span>
        <span>订单</span>
    </span>
    <span class="guide_item"  @click="goto(`/profile`)" :class="{on:isGreen(`/profile`)}">
        <span>
            <i class="iconfont iconwode"></i>
        </span>
        <span>我的</span>
    </span>
</footer>
</template>

<script type="text/ecmascript-6">
export default {
    methods:{
        isGreen(path){
            // 将传入的路径，传给当前元素的$route.path
           return  this.$route.path === path
        },
        goto(path){
              // &&如果为true就走后面的
             path !== this.$route.path &&  this.$router.push(path)
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .footer_guide
        position fixed
        bottom 0
        left 0
        width 100%
        display flex
        background white 
        .guide_item
            width 25%
            text-align center
            display flex
            flex-direction column
            &.on
                color $green 
            span
                margin-top 4px 
                font-size 12px 
                .iconfont
                    font-size 22px
                 
</style>
