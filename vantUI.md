### 引入组件(按需方式)
    1、yarn add babel-plugin-import -D
    2、配置后就可以直接引入组件，否则每次都需要引入vant+样式引入
    // import { Button,Form,Field } from 'vant';
    // Vue.use(Button)
    // Vue.use(Form)
    // Vue.use(Field)

### 定制主题覆盖默认样式
    1)安装less和less-loader
        yarn add less less-loader -D
    2)引入样式源文件     
        直接覆盖：
                 'border-color': '#eee',下面直接修改颜色
                 red：#1231231

        全部引入：
        如果不用全部样式修改就将hack注掉否则报错：
        新建文件 ./src/styles/style.less 保存样式，修改里面样
        const lessPath = path.resolve(__dirname,"./src/styles/style.less")//__dirname是当前目录vue.config.js
        //  hack: `true; @import '${lessPath}'`,
        ----------------------------------------------------------------------
        less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {(修改样式)
            // 直接覆盖变量
            'text-color': '#111',
            'border-color': '#eee',
            red:"#d7086f", //修改颜色样式
            orange:"#ffff00",//修改颜色样式
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            //  hack: `true; @import '${lessPath}'`, //可以批量修改文件
          },
        },
      }

      按需引入样式(配置后无需在引入样式)：
        babel.config.js 中
        module.exports = {
         plugins: [
            [
            'import',
            {
                libraryName: 'vant',
                libraryDirectory: 'es',
                // 指定样式路径
                style: (name) => `${name}/style/less`,//设置这个，自动引入样式无需再手动引入样式
            },
            'vant',
            ],
        ],
        };

### postcss-Autoprefixer插件
    yarn add autoprefixer -D 
    作用：自动获取浏览器流行度和能够支持的属性，并根据数据自动为css规则添加前缀
    注意：1、postcss要在单独post文件中配置，否则插件会造成相互影响，不生效
         2、无需安装postcss，安装autoprefixer和postcss-pxtorem即可。
         3、如果报错降低版本
         4、配置在postcss.config.js中