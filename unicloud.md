# unicloud  
## 配置
    1、common新建公共模块api(公共模块是云函数都可以用的)
    2、创建云函数myfun，
    'use strict';
    const api = require("api")//引入公共模块
    exports.main = async (event, context) => {
        
        let res = api.test()//公共函数中暴露的方法
        
        //返回数据给客户端
        return res
    };
    3、本地运行云函数或者上传，公共模块也是

## 调用云函数
    uniCloud.callFunction({
        name:"myfun", //一定要有云函数名字
        success:(res)=>{
                console.log(res)
        }
    })


## 百度sdk文档
    1、npm install baidu-aip-sdk
    2、公共模块common引入
    var AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;
    // 设置APPID/AK/SK
    var APP_ID = "你的 App ID";
    var API_KEY = "你的 Api Key";
    var SECRET_KEY = "你的 Secret Key";

    // 新建一个对象，建议只保存一个对象调用服务接口
    var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);