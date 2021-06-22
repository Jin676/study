1、vue中使用sass安装两个包,无需配置
    yarn add node-sass
    yarn add sass-loader@7.0.3

2、[class*="xxx"]
//只要携带class*=只要携带后面字符串的内容，都会触发该类
[class*='icon'] {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

3、数组形式class
    :class=["wrapper"] //.wapper
    :class=[`wrapper--${}`] //可以写变量wrapper-xx
    :class=[`wrapper--${}`,{
        'plain':plain        //plain必须是布尔值，显示和隐藏该属性
    }]

4、封装icon
//所有的icon和span 添加margin，+是兄弟选择器
.van-button [class*=icon]+span{
    margin-left: 5px;
}

5、封装click
    父组件：
    <Button @click='xx'></Button>//这是自定义事件
    内部：
        methods: {
        handleClick(e){
            this.$emit('click',e)
        }
    },
    <button @click="handleClick"></button>
    解释：子组件代替父组件触发click事件 $emit触发的都是自定义事件，原生事件浏览器自动触发

6、动画效果
<transition name="aa"></transition>
//aa就是名字，keyframes是动画
.aa-enter-active{
    animation: run 1s;
}
.aa-leave-active{
     animation: run 1s reverse;
}

@keyframes run{//run是动画名
    0%{
        opacity: 0;
         transform:translateY(20px) //竖移20px
    }
    100%{
        opacity: 1;
        
    }
}

7、样式
&_header === row_header //类名：row_header
&.active === row //父元素添加身上添加active
&::after{ //父元素身上添加
        content:"";
        width: 10px;
        height: 100px;
        background: violet;
    }
8、深度选择器
   scoped会给当前组建的模板中所有元素都添加一个随机的属性
   scoped会给当前组建中所有样式也添加一个对应的属性选择器 

   作用情况：scoped内部样式修改不了使用深度选择器 
   原理：使用深度选择器，scoped就不会在该选择器后面加入属性选择器了 
   使用场景：在scoped修改外部传来的元素的样式，因为影响不到外部传来的样式，因此需要深度选择器::v-deep,选择器上不添加scoped的标记，因此样式也就好使了
   sass深度选择器::v-deep 
   less深度选择器/deep/

9、radio-group
    单选框组，无需每个radio绑定v-model
    props:{
        type:null
    },
    provide(){ 
    //一定要函数方式，否则拿不到this，原因：猜测是一个组件实例对应一个radioGoup
        return {
            radioGoup:this
        }
    }

   radio-item:
   inject:{
        radioGoup:{
            default:""
        }
    },
    computed:{
        model:{
         get(){
             return this.radioGoup?this.radioGoup:this.value 
             //判断是否被包裹，包裹了就返回包裹的组件
         },
         set(value){//model一旦修改就会触发set，传给父组件
            //触发父组件的input事件
            // console.log(value)
            this.$emit("input", value)
         }   
        },
        isGoup(){
            return !!this.radioGoup
        }