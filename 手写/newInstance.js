// new工具函数
function newInstance(Fn,...args){
    //1、创建一个空对象(Object)
    const obj = {}

    const result = Fn.call(obj,...args)

    if(result instanceof Object){
        return result
    }

    obj.__proto__ = Fn.prototype

    obj.__proto__.constructor = Fn

    return obj
}

//instanceof函数
//实际上判断的是元素是否在原型链上

function myInstance(obj,type){


    let protoObj = obj.__proto__

    while(protoObj){//循环查找，赋值给protoObj,直到没有__proto__为止
        if(protoObj === type.prototype){
            return true
        }
        protoObj = obj.__proto__
    }

    return false
}