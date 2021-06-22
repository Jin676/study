const path = require("path")
const lessPath = path.resolve(__dirname,"./src/styles/style.less")//__dirname是当前目录vue.config.js文件所处目录,后面是文件位置
module.exports = {
  runtimeCompiler: true,

  //性能优化，关闭语法检查和map
  // 关闭EsLint的规则
  lintOnSave: false,

  productionSourceMap:false,

  css: { // 添加postcss配置
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            'text-color': '#111',
            'border-color': '#eee',
            red:"#d7086f",
            orange:"#ffff00",
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            //  hack: `true; @import '${lessPath}'`,
          },
        },
      }
    }
  },
  

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        ws: true,
        changeOrigin: true,
        pathRewrite:{
          "^/api":""
         }
      }
    } 
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
