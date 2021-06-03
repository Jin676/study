## ts
### 数组
    ts数组类型和泛型数组
    数组类型：number[]
    泛型数组：Array<number>

    元组：
        解决数组中数据必须一致的问题，可以存储多类型
        let t1: [123,"哈哈"] 
        t1[0]  智能提示number方法
        t1[1] 智能只是string方法

### 枚举
    enum Gender{
        女,
        男
    }
    let g:Gender = Gender.男
    let g2:Gender = Gender.女

    //为什么会有枚举
    //比如性别的数据，男和女  如果让用户输入男人、女人、男的、女的不统一，读取时候没法读取
    //把特定个数的数据，且值是固定的情况数据，使用枚举，一般星期、性别使用枚举类型
    //一般布尔类型设计性别 true--1 false --0  判断语句if中0代表false 1代表true
    //可以修改所在位置的数字，但是数字类似索引不是索引


### any类型和void类型
    一个是任意类型，一个是没有类型void类型可以赋值：undefined和null

### object类型
    let obj:object = new String("123") //这样写就不会报错了

### 联合类型
    function fn(str:string | number) // |为联合类型

### 类型断言
    (xxx as 类型) <string>str //类型强制转换成这个类型数据
     function getLength(str:Istr|string|number):number{
        if((<string>str).length){ //这里断言str是字符串，并且有length属性
            return (<string>str).length
        }else{//否则进入这里
            return str.toString.length
        }
    }

### 接口
    接口定义后，可以当成 类型使用 
    接口内部限定属性 
    只读属性：redonly   const 和 redonly区别 redonly是限制属性，const限制变量
    可有可无的属性：?
    

    对象中属性需要约束，或者函数参数需要约束
    接口是一种限制，可以限制对象属性和方法  


    函数接口：
    interface Iperson{
        (x:number,y:string):string
    }

    //实现
    let fn:Iperson =  function(x:number,y:string):string{
        return "Sdf"
    }
    
    一个函数接口，对应一个函数

    类接口：
    //必须满足接口属性，可以多不可以少
     interface Iuser{
        fly(str:string):void
    }

    class User1 implements Iuser{
        name:string
        age:number
        constructor(name:string,age:number){
             this.name = name
             this.age = age   
        }
        sayHi(){
            console.log("原型上的方法")
        }
        fly(str:string){
            console.log(123)
        }
    }
    new User1("sdf",12)

### 类实现多个接口
    接口之间通过继承，得到一个接口，类实现接口

### 类继承分析
    继承：类与类之间关系，有了继承之后，目的：为了实现多态    
    什么情况，类和类会产生继承？
    对象--抽取类--多个类---抽取基类---抽取派生类
    分析对象---抽取处对象的特征(属性)和行为(方法)，
    学生类---姓名，性别，年龄---属性  吃饭，睡觉---方法--玩的方法
    人类--- 姓名，性别，吃饭，睡觉
    人类是一个大类别，学生类是人类中一个类别 ----可以产生继承的关系
    通过分析类与类之间有没有类似的属性或方法，最终抽取出一个父级的类，从而实现聚成

### 类的继承
    class Person{
        name:string
        age:string
        constructor(name:string)
    }


### 多态！！！
    多态：同一个行为针对不同的对象，产生的结果不同
    父类：Animal
    子类：Dog
    子类: Pig
    子类: Horse
    //多态展示
    //定义一个数组，里面用来存储Animal类型的对象数据\
    //Person是父类，Student等等都是子类，子类可以使用父类，
    // 子类变量:父类型 = new 子类构造函数
    //调用的方式是子类中的方法
    //左侧类型是我只存储这类，你多放了我也不接收
    let ani:Person = new Person("人类",123)
    let student:Person = new Student("学生",123,234)
    let cn:Person = new CN("中国人",123)
    let jp:Person = new JP("日本人",123)

    //展示效果
    let arr:Person[] = [student,cn,jp]
    function showEat(per:Person){
        per.eat
    }
    //循环遍历数组
    for循环arr[i],showEat(arr[i]) //方法依旧可以调用而且是自身上的

    //大话设计模式--23种设计模式

### 类的修饰符和存取器
    public private protected
    默认的修饰符public：任意地方都可以访问
    private：私有的，只能在本类中修改，子类继承了但是不能用
    protected：受保护，外部不能用
    readonly：只读

    存取器：
    取：
    get fullName(){
        return this.firstName +"_"+ this.lastName
    }
    存：
    set fullName(val){//val就是get中return的结果
        const result = val.split("_")
       this.firstName = result[0]
       this.lastName =result[1]
    }
### 抽象类
    抽象类不能够实例化，但可以继承给子类    
    抽象方法：添加abstract了方法，在抽象类中不应该有具体实现，只能继承给子类
    普通方法：抽象类中可以使用普通方法，但是抽象类没法实例化调用不了，只能继承给子类子类调用
    抽象类继承：抽象类继承了一个抽象类，子类会覆盖父类抽象成员，不用实现


### 类和接口区别：
    类：
    抽象类不能被实例化，需要依靠子类采用向上转型的方式处理；
    抽象类必须有子类去继承，一个子类只能继承一个继承抽象类；
    抽象方法必须是public和protected（因为如果是private，则不能被子类继承，子类就不能实现此方法）；
    如果子类继承了此抽象类，则子类必须要重写抽象类中的全部抽象方法（如果子类没有全部重写父类中的抽象方法，则子类也需要定义为abstract的）
    抽象类不能用final声明，因为抽象类必须有子类；

    接口：
    接口支持多继承，即一个接口可以extends多个接口，间接的解决了Java中类的单继承问题
    一个类可以实现多个接口

    抽象类和接口的区别：
    抽象类里面可以有方法的实现，但是接口完全都是抽象的，不存在方法的实现；
    子类只能继承一个抽象类，而接口可以被多个实现；
    抽象方法可以是public，protected，但是接口只能是public，默认的；
    抽象类可以有构造器，而接口不能有构造器；

    抽象类中的抽象方法在子类中必须实现， 接口中的非可选项在接口被调用时必须实现

### 函数类型
    命名函数、匿名函数
    命名函数：
    function fn(x:string,y:number):void{
        
    }

    匿名函数:
    let f3:(x:string,t:number):void = function(x:string,t:number):void{
        
    }
    let f3:(x:string,t:number)=>void = function(x:string,t:number):void{
        
    }

### 函数重载
    function fn(x:number,y:number):number
    function fn(y:string,y:string):string
    function fn(x:number|string,y:number|string):string|number

     不符合条件传入参数会报错，我们需要判断

### 泛型
    不确定什么类形时候，用泛型代替，调用时候传入具体类型，类型的位置使用<T>代替类型

    为什么不用any，因为any类型后没有智能提示，any所在位置的类型，方法或属性调用，都没有提示。

    函数调用的时候规定类型，之前都用T代替着，传的数据是泛型位置的类型数据
    函数泛型：
        function getArr<T>(str:T,count:number):T[]{
            let arr:T[]= []
            for (let index = 0; index < count; index++) {
                const element = arr[index];
                arr.push(str)
            }

           return arr
       }
      let result2 = getArr<number>(10.111,12)
      console.log("result2",result2)
      console.log(result2[0].toFixed)

### 用户
    用户类
    //泛型接口
    interface BaseCRUD<T>{
        //限定存储数据类型
        data:T[]
        //添加用户
        add(user:T):number
        //根据id查询用户
        getById(id:number):T
    }

    //用户类
    class User{
        id:number
        name:string 
        age:number
        constructor(name:string,age:number){
                this.name=name
                this.age =age 
        }
    }

    //针对用户类进行增删改查操作
    //为什么使用泛型接口，为了应对不同对象进行操作
    class UserCRUD implements BaseCRUD<User>{
        //定义属性
        data:User[] = [] //用于存储用户对象信息

        //添加用户对象的方法
    
        add(user:User):number{
            //为什么不是user直接放入数组中，而是新创建对象？
            //user是引用变量所存储的地址，不是一个新的对象
            let obj={
                id:Date.now()+Math.random(),
                name:user.name,
                age:user.age
            }
            //把用户对象保存到容器中
            this.data.push(obj)
            //返回id
            return obj.id
        }
        getById(id:number):User{
            return this.data.find(item=>item.id === id) //返回要求User类型，[]不行返回new User
        }
    }
            //实例化与一个工具类对象
           let uc:UserCRUD =  new UserCRUD()
            //调用添加对象的方法,//添加用户就得是User类型，User类型就需要new User
            //User类类是class，需要实例化User产生
            uc.add(new User("小米",12))
            uc.add(new User("小强",12))
            uc.add(new User("小红",12))
        //不使用泛型接口，工具类CRUD就被写死了，不能使用其他类，因为使用泛型接口，可以使用其他类 


### 泛型约束           
    T extends Iperson{
    }
    interface Iperson{
        length:number
    }
    function fn<T extends Iperson>(str:T):number{
        return str.length
    }
    fn<string>("sdf")

    传入的T类型中要包含Iperson接口中的属性，比如Iperson有length，传入的类型中必须要可以使用length属性

### 声明文件
    //声明语句 让ts代码有提示
    declare var jQuery: (selector: string) => any;
    jQuery('#foo');

## vue3
    摇树
    vue2.x组件内必须要写根标签，vue3不需要


    响应式代理区别：
    vue2中使用的是defineProperty，vue3中使用的是proxy


    


        

    
