function Observer(data) {//传入data对象
    this.data = data;
    //启动对data对象中数据的劫持。walk：走路
    this.walk(data);
}

Observer.prototype = {
    walk: function(data) {
        var me = this;
        //遍历data中所有属性
        Object.keys(data).forEach(function(key) {
          //convert转换，将data中普通数据，转换成响应式数据的方法
            me.convert(key, data[key]);
        });
    },
    convert: function(key, val) {
          //将data中属性重新定义为响应式，通过defineReactive函数
        this.defineReactive(this.data, key, val);
    },

    defineReactive: function(data, key, val) {
        //创建一个对应的dep对象(订阅器/中间人)
        var dep = new Dep();
        //通过隐式递归调用实现所有层次属性的监视/劫持，val可能是对象，也可能是属性
        var childObj = observe(val);

        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
                if (Dep.target) {//这里target代表wathcer，但是此时没有
                    dep.depend();//建立dep与watcher关系
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                //将新的值，赋值给旧的值，让他修改
                val = newVal;//数据变化了，但是此时界面没变化，需要订阅者和发布者模式
                //尝试监视新的值的内部数据结构
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });
    }
};

function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }
    //如果是对象，创建一个对应的observer实例对象，会再次进入Observer函数中
    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];//包含所有订阅者的数组
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },

    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;