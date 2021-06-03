
// 定义一系列声明式工具函数
//arr.map((item,index)=>{})
    function map(array,callback){
        let result = []
        return result
    }

   Array.prototype._map=function(callback){
    let result = []
    //123
    for (let index = 0; index < this.length; index++) {
        const element = this[index];
        result.push(callback(element,index)) 
     
    }

    return result
   }   


//    arr.a._map((item,index)=>{
//        console.log(item)
//    })


//reduce

Array.prototype._reduce = function(callback,init){
    let result =init

    for (let index = 0; index < this.length; index++) {
        const element = this[index];
        //将返回值作为新的result，作为下一次统计的结果
       result = callback(result,element,index)
    }

    return result
}
let arr = new Array()
arr.a=[1,2,3,4]
arr._reduce((pre,item,index)=>{
    return pre+item
},0)


//chunk

function chunk(array,size=1){

    const bigArr = []
    let smailArr = []

    if(array.length ===0){
        return bigArr
    }

    if(size<1){
        size =1
    }

   array.forEach((item,index) => {
    
    //小数组推到大数组只进行1次
    if(bigArr.length===0){
        bigArr.push(smailArr)
    }
    
    smailArr.push(item)
    //添加后判断小数组长度===size，准备小数组，继续添加
    if(smailArr.length === size){
        smailArr = []
    }
    
   });

    return bigArr

}

console.log([1,2,3,4,5],2)