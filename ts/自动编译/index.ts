(()=>{
    function fn(n:number){
        console.log(n)
    }
    //类型注解：fn(n: number): void 带来智能提示
    fn(123)

    //需求 必须传入firstName属性和lastName属性
    
    interface Person{
        firstName:string;
        lastName:string;
    }

    function showPerson(person:Person){
        console.log(person.firstName+"_"+person.lastName)
    }

    //最后定义一个对象
    let per = {
        firstName:"东方",
        lastName:"不败"
    }

    showPerson(per)

})()