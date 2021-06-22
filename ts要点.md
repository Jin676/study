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


### 跳过接口约束
    //1、使用类型断言跳过检测
    Interface Iabc{
        abc:string
        [proName:string]:void
    }
    //  xxx as abc

    //2、索引签名
     [proName:string]:void
     知识点：对象的key如果不是string类型，会自动调用tostring转换成string类型


### 只读数组
    let arr:ReadonlyArray<string> = ["a","b","c"]
    //只读数组


### 混合接口
    限定属性又限定函数    
interface Icount{
    ():void 
    count:number
}

 let getcount =function():Icount{
    let fn =<Icount>function(){
        fn.count++
        console.log(fn.count)
    }
    return fn
 }


### 函数声明和重载,配合可选参数使用(在实现的参数加上?三元表达式就不会报错)
定义函数：let addfun:(a:number,b:number)=>number
function add(x:number,y:number):number
实现：let addfun:(a:number,b:number):number=>{
    return 123
}
知识点：可选参数中间报错，只能在后面，不能单独放在中间
            
### 泛型约束(泛型必须遵守接口)
    传入的对象必须要有，接口上的属性
    Interface length1{
        length:number
    }
    function fn<T>(<T extends length1>){

    }
    fn<string>()//string有length属性

## 在泛型约束使用类型参数    
    <T,K extends keyof T>(obj:T,key:string)
    //K必须是T中存在的

### 不希望别人通过基类创建实例
    给基类constructor添加protected，就不能通过基类创建对象了

### 参数属性
    public、protected等等，好处无需再定义属性    


### 抽象类和接口区别
    1、接口只能定义约束，不能定义具体实现
    2、抽象类中即可以定义约束，又可以定义实现
    
    注意点：接口继承类，就会继承类中所有属性和方法，但是只会继承属性和方法的声明，
    不会继承属性和方法实现

    注意点：如果接口继承的类中包含protected的属性和方法，那么只有这个类的子类实现这个接口

### 类中方法
    表达式的方式，方法存在实例中
    声明式的方式，方法存在原型中

### 接口合并现象
    同名接口默认会自动合并

### 枚举
    注意点：字符串给前面枚举值赋值了，后面枚举值也必须手动赋值
    注意点：和数字枚举不一样，字符串枚举不能使用常量或者计算结果给枚举值赋值 
    常量或者计算：function的返回值，或者外部变量赋值
    注意点：苏日安字符串枚举不能够使用常量或者计算结果给枚举值赋值，但是天可以使用内部其他枚举值来赋值   

    异构枚举：
    既包含数字，又包含字符串
    注意点：如果是字符串的枚举，无法通过原始值获取到枚举值

    枚举成员类型：
    数字枚举本质就是数值，所以写一个数值也不会报错
    注意点：如果是字符串枚举，只能是枚举成员的值不能是其他值

    联合枚举：
    通过|连接就是联合类型
    enum gender{
        male,
        female
    }
    interface Iinterface{
        age:gender   //相当于age:(gender.male,gender.female)
    }

    运行枚举和常量枚举：
    运行枚举是真实存在的，所以可以在运行时使用
    常量枚举：const enum 就是常量枚举，常量枚举不生成真实存在的对象，
    而是利用枚举成员的值直接替换使用到的地方

### 对象类型兼容性    
    1、对象和接口兼容
       对象类型赋值给接口类型，情况下接口属性，可多不可少
       会递归检查

### 函数类型兼容性
    1、参数个数
    函数相互赋值，参数可少不可多，不能将参数多的函数赋值给参数少的函数
    2、参数类型
    参数类型必须一模一样，否则会报错
    3、返回值类型
    返回值类型相同才能相互赋值，否则报错
    4、函数双向协变
        1)、参数的双向协变
            函数参数的联合类型可以赋值给拥有其中一个类型的函数
        2)、返回值双向协变
            返回值是联合类型的不能赋值给是具体类型的  
        总结：参数联合类型可以随意赋值，返回值类型只能具体的赋值给联合类型    
    5、函数重载
    函数重载少的不能赋值给函数重载多的，重载多的可以赋值给重载少的

    总结：除了返回值其他都是多的可以赋值给少的

### 枚举兼容性
    数字枚举和数值(key)枚举兼容,
    多个枚举之间不能赋值给相同的变量，
    字符串枚举和字符串不兼容，不能将字符串赋值给字符串枚举

### 类的兼容
    不同类赋值，只会比较实例成员，不会比较构造函数和静态成员
    实例成员少的不能赋值给多的

    类的私有属性和受保护属性会影响兼容性
    类的私有属性和受保护属都不能赋值

### 泛型的兼容性
    泛型只影响使用部分，不会影响声明部分
    泛型调用传的类型不同才会影响兼容性

## 高级类型
### 交叉类型
    将多个类型合并为一个类型
    res = {} as (T & U)
    (T & U) 
    一般用res =Object.assign(arg1,arg2)
    合并对象，返回值是(T & U)类型对象

### 联合类型
    |

### 类型保护
    对于联合类型变量，使用时如何确切告诉编译器他是哪种类型，通过类型断言或者类型保护
    类型保护：
        1、定义一个类型保护函数，函数返回值类型是布尔类型
        这个函数的返回值类型是，传入的参数+is具体类型
        function isString(value:(string|number)):value is string{
            return typeof value === "string"
        }

        if(isString(value)){
            value.length
        }else{
            value.toFixed()
        }

        /、typeof实现基本类型保护：
        有点：除了通过定义类型保护，告诉编译器变量类型外，还可以使用typeof实现类型保护
        注意点：如果使用typeof实现类型保护，只能使用===或者!==
                只能保护number/string/boolean/symbol类型
        if(typeof value === "string"){

        }else{

        }
        //不过不写则会报错，原因是不确定value具体类型


        3、instanceOf实现类型保护：
        class Person{
            name:string ="xxx"
        }
        class Animal{
            age:number = 12
        }
        let getRandomObject=():(Person|Animal)=>{
            let num = Math.random()
        return (num >=0.5)?new person():new Animal()
        }
        obj.name会报错//因为obj可能是person也可能是Animal类型
        if(obj instanceof Person){
            obj.name//就不会报错了
        }else{

        }

### null和undefined
    默认情况下可以任意赋值给任意类型，也可以互相转换
    注意点：如果不想把null和undefined赋值给其他类型ts.config中开启strictNullChecks
    开启strictNullChecks后，还想赋值就需要使用联合类型
    可选参数和属性开启strictNullChecks，name自动变成联合类型，就是当前类型变成 （string|undefined）
           

### 去除null和undefined检测
    1、类型断言
    2、非空断言:如果联合类型有undefined或者null，使用非空断言 value!

### 类型别名(type)
    type MyString = string;//给string类型起了一个别名佳作MyString，MyString或者string都值同一个东西
    
    1、类型别名也可以使用泛型：
    type MyType<T> = {x:T,y:T}
    let value:MyType<number>
    value={x:123,y:213}


    2、类型别名中使用自己：用于定义树状结构嵌套结构
    type MyType={
        name；string
        //一般用于定义一些树状结构或者嵌套结构
        children?：MyType
    }
    //树状结构
    type value:MyType={
        name；string
        //一般用于定义一些树状结构或者嵌套结构
        children：{
             name；string
        children：{}//如果报错则在children添加?
        }
    }

    3、接口和类型别名相互兼容：
        1)都可以描述属性或方法
        2)都允许拓展(接口使用继承，type使用type名 &{age:number} )
        type MyType={
            name:string
            say():void
        }
        type MyType2 = MyType & {
           age:number
        }
        3)type 可以声明基本类型别名，联合类型，元组等类型，interface不能
        type myType = boolean

        4)type不会自动合并，同名类型别名报错

        5)字面量作为类型使用，字面量取值必须是字面量的值
        字面量1,2,3,4,"sdf","qwe"//类似常量
        
### 可辨识联合
    1、具有共同的可辨识特征(共同属性)
    type xxx= (a|b|c) //可辨识联合，a,b,c他们中都有相同的属性length，type通过编译器可以使用他们中的属性
    可辨识特征处理不完整默认不会报错，config中打开check，如果没有处理完他会报错
    方式二：添加default +never(不常用)


### 索引访问操作符
    根据索引访问操作符，就能得到某个索引的类型
    class Person{
        name:string
        age:number
    }
    type myType = Person["name"]//获取Person中索引类型
    注意点：不能反回null/undefined/never

### 映射类型
    [p in keyof T]作用：遍历出指定类型所有的key，添加到当前对象上
    //P是属性T是对象
    readonly [P in keyof T]:T[P]
    由于生成只读属性和可选属性比较常用，ts内部已经提供好了现成的

    interface TestInterface1{
        name:string,
        age:number
    }

    1、Readonly/Partial 只读和可选映射类型
    type Mytype = Readonly<TestInterface1>
    type Mytype = Partial<TestInterface1>

    2、Pick映射类型(将原有类型中部分内容映射到新类型中)
    type Mytype = Pick<TestInterface1,"name">//将原有类型中的name映射到新的类型中

    3、Record映射类型
    他会将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型
    type Mytype = Record<Animal, TestInterface1>
    Animal作为key，TestInterface1看做属性
    映射出的新类型，Animal中每个属性都包含，TestInterface1的属性
    例子：
        let res:MyType={
            person:{
                name:"zs",
                age:12
            },
            dog:{
                name:"zs",
                age:12
            },
            cat:{
                name:"zs",
                age:12
            }
        }

    4、映射类型进行推断    
       映射类型拆包
       +readonldy [P in keyof T]:T[P]
       //+所有属性转换成只读属性 -转换回去

### 条件类型和分布式条件类型
    条件类型 T extends U ? X : Y

    分布式条件类型：
    被检测类型是个联合类型的时候，该条件类型就被成为分布式条件类型
    应用场景：
    type Mytype<T,U> = T extends U ? never : T;
    //never是取消掉，number属于前面哪个类型，如果一样则取消，不一样保留
    type res = MyType<string | number |boolean, number>

    从T中剔除可以赋值给u的类型Exclude
     type res = Exclude<string | number |boolean, number>//剔除了number
    提取T中可以赋值给U的 
     type res = Extract<string | number |boolean, number>//提取了number
    剔除null和undefined 
     type res = NonNullable<string | number |booleannumber|undefined|null>

    获取函数返回值类型
    type res = ReturnType<()=>string>//返回string

    获取一个类的构造函数参数组成的元组类型，ConstructorParameters
    type res = ConstructorParameters<keyof Person>

    获取函数的参数类型组成的元组类型。Parameters
    type res = Parameters<typeof say> //将say类型组成元组赋值给res

### infer关键字  
    条件类型提供了一个infer关键字，可以让我们在条件类型中定义新的类型
    type MyType<T> = T extends Array<infer U>?U:T //infer U === any[] T[number]


### unknown类型
    1、人类类型都可以赋值给unknown类型

    2、如果没有类型断言或者基于控制流类型细化，那么不能将unknown类型赋值给其他类型
    将unknown改为其他类型，要不就用if和eles进行控制流类型细化

    3、如果没有类型断言或者基于控制流类型细化，那么不能在unknown类型上进行任何操作

    4、只能对unknown进行相等或不等操作，><没意义。

    5、unknown和其他类型交叉都是其他类型