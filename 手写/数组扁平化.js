//数组扁平化，多维数组转换成一维数组
let arr = [1,2,[3,4,[5,6,[7]]]]

function arrFlatten(arr){
    let result = [];

    for (let index = 0; index < array.length; index++) {
        var element = array[index];
        //判断element是不是数组
        if(Array.isArray(element)){
            //合并递归,concat接收方法，他返回新数组对原数组没影响
           result = result.concat(arrFlatten(element))            
        }else{
            result.push(element)
        }
    }


    return result;
}

function arrFlatten2(arr){
   return arr.reduce((pre,item)=>{
       //还需要考虑item是不是数组
        return pre.concat(Array.isArray?arrFlatten2(item):item)
    },[])
}