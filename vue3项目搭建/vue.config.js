const path = require("path")
const px2rem = require("postcss-px2rem")
//没生效可能是之前使用ts结尾原因,使用前需要@type或者直接使用js
const postcss = px2rem({
    remUnit: 37.5  //设计稿十等分之后的值，设计稿750就写75，设计稿375就写37.5 
})

module.exports = {
    // runtimeCompiler: true,  在组件中使用template，但是会额外增加10k左右
    lintOnSave: false,     // 关闭EsLint的规则
    css: { // 添加postcss配置
      loaderOptions: {
        postcss: {
          plugins: [
            // 配置postcss-px2rem
            px2rem({
                remUnit: 37.5  // 设计稿等分后的rem值   375/10
            })
          ]
        }
      }
    },
  
     configureWebpack: { // 内部写webpack原生配置
      resolve: {
        extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
        alias: { // 路径别名(简写方式)
          // 'vue$': 'vue/dist/vue.esm.js',  // 表示精准匹配   带vue编译器
          '@': path.resolve(__dirname, 'src'),
          '@components': path.resolve(__dirname, 'src/components'),
        }
      }
    },
    devServer: {
      proxy: {
        // 处理以/api开头路径的请求
        // '/api': 'http://localhost:4000'   // http://localhost:4000/api/search/users
        '/api': {
          target: 'http://localhost:4000', // 转发的目标地址
          pathRewrite: {
            '^/api' : ''  // 转发请求时去除路径前面的/api
          },
          changeOrigin: true,
        },
  
        '/gh': {
          target: 'https://api.github.com', // 转发的目标地址
          pathRewrite: {
            '^/gh' : ''  // 转发请求时去除路径前面的/api
          },
          changeOrigin: true, // 支持跨域, 如果协议/主机也不相同, 必须加上
        }
      }
    }
  
  
  }