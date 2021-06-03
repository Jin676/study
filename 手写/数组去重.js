  //[1,2,2,3,4,5,6,7,7,1,2]
    function uniq(arr){
        let result=[]
        arr.forEach((element,index) => {
            //如果没找到就push
            if(result.indexOf(element) === -1){
                result.push(element)
            }
        });

        return result
    }

    function uniq2(arr){
       return [...new Set(arr)]
    // for of循环
    
    }
