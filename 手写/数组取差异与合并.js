

let arr1=[1,2,3]
let arr2=[2,3,4]
function getArrEqual(arr1,arr2){

    let result = []
    //合并数组，filter筛选 从前往后数索引 ！== 从后往前数的索引
    
    arr1.concat(arr2).filter((item,index,arr)=>{
        if(arr.indexOf(item)!==arr.lastIndexOf(item)){
            if(result.indexOf(item)!== -1){
                result.push(item)
            }
        }

    })


    return result 

}
function getArrDiff(arr1,arr2){

    let result = []
    //合并数组，filter筛选 从前往后数索引 ！== 从后往前数的索引
    
    arr1.concat(arr2).filter((item,index,arr)=>{
        if(arr.indexOf(item)===arr.lastIndexOf(item)){
            //在数组中从后往前找，从前往后找，找到了同样的说明有差异
            if(result.indexOf(item)!== -1){
                result.push(item)
            }
        }

    })


    return result 

}