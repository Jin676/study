function Compile(el, vm) {
    this.$vm = vm;
    //判断传入的el的Nodetype，如果没有则保存body，有的话则保存el
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {
        //1、将el元素所有子节点保存到fragment容器中
        this.$fragment = this.node2Fragment(this.$el);
        //2、编译fragment中所有层次子节点(通过递归调用)
        this.init();
        //3、将编译好的fragment添加到el元素中
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(),
            child;

        // 将原生节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        //得到所有子节点
        var childNodes = el.childNodes,
            me = this;
        //遍历所有子节点
        [].slice.call(childNodes).forEach(function(node) {
            //得到子节点的文本内容
            var text = node.textContent;
            //定义用来匹配插值语法的正则对象
            var reg = /\{\{(.*)\}\}/; //正则中.标识任意字符，*标识任意多个
            //如果当前节点是元素节点
            if (me.isElementNode(node)) {
                //编译 元素节点中所有指令属性
                me.compile(node);
                //如果是插值语法格式文本节点
            } else if (me.isTextNode(node) && reg.test(text)) {
                //编译文本节点
                me.compileText(node, RegExp.$1);
            }
            //如果当前子节点还有子节点
            if (node.childNodes && node.childNodes.length) {
                //进行递归调用==>实现对所有层次子节点编译处理
                //如果不进行递归，只能检测最外层，递归调用可以实现所有层次子节点处理
                me.compileElement(node);
            }
        });
    },

    compile: function(node) {
        //得到当前元素的所有属性节点
        var nodeAttrs = node.attributes,
            me = this;
        // [].slice整体是个函数，call方法调用后， [].slice也会调用
        //遍历所有属性节点
        [].slice.call(nodeAttrs).forEach(function(attr) {
            //得到属性名：v-on：click
            var attrName = attr.name;
            
            if (me.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);
                // 事件指令
                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // 普通指令
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });
    },

    compileText: function(node, exp) {//exp是表达式
        compileUtil.text(node, this.$vm, exp);
    },

    isDirective: function(attr) {//是否是指令
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {//isEventDirective是不是事件指令,dir是指令
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        var updaterFn = updater[dir + 'Updater'];
        //读取属性值
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));//这行代码进入observer中的get，此时watcher没创建

        new Watcher(vm, exp, function(value, oldValue) {//绑定用于更新节点的函数
                    //此时再次进入observer的get中，target有值了，dep和watcher也建立关系
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {//更新界面
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};