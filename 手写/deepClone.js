/* <!-- 
  实现深拷贝
      1). 大众乞丐版
          问题1: 函数属性会丢失
          问题2: 循环引用会出错
      2). 面试基础版本
          解决问题1: 函数属性还没丢失
      3). 面试加强版本
          解决问题2: 循环引用正常
      4). 面试加强版本2(优化遍历性能)
          数组: while | for | forEach() 优于 for-in | keys()&forEach() 
          对象: for-in 与 keys()&forEach() 差不多
  --> */

  export function deepClone1(target){
      //乞丐版
     /*   问题1: 函数属性会丢失
          问题2: 循环引用会出错,循环引用：你指向我，我指向你 一直重复
          报错原因：
          循环引用想要通过stringify相互字符串化，出现死循环
           */
     return JSON.parse(JSON.stringify(target))
  }
  export function deepClone2(target){
    const type = getType(target)
    if(type === "Object" || type==="Array"){  
        const cloneTarget = type ==="Array"?[]:{}
       for (let key in target) {
           if (target.hasOwnProperty(key)) {
            cloneTarget[key] = deepClone2(target[key]);
           }
       }
       return cloneTarget
    }else{
        return target
    }
  }
/* 
解决了: 函数属性会丢失
解决: 循环引用会出错    
解决思路:
    目标: 同一个对旬/数组只能被克隆1次
    创建克隆对象前:　如果克隆对象已经存在, 直接返回
    创建克隆对象后: 保存克隆对象 
    缓存容器结构: Map  key: target, value: cloneTaget
*/
export function deepClone3 (target, map=new Map()) {
    // 被处理的目标是数组/对象
    if (target instanceof Array || (target!==null && typeof target==='object')) {
      // 第一步，map中存在对应的克隆对象, 直接将其返回
      let cloneTarget = map.get(target)
      if (cloneTarget) {
        return cloneTarget // 不要对同一个对象进行多次clone
      }
      //第二步，创建克隆对象，因为缓存中没有也就是说此时为第一次克隆
      cloneTarget = target instanceof Array ? [] : {}
      //第三步，保存到map容器,target作为key，cloneTarget存value
      map.set(target, cloneTarget)
  
      for (const key in target) {
        if (target.hasOwnProperty(key)) {
          cloneTarget[key] = deepClone3(target[key], map)  // 对属性值进行递归处理
        }
      }
      return cloneTarget
    } else {
      return target
    }
  }