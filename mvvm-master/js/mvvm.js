function MVVM(options) {
    //将配置对象保存到vm上
    this.$options = options;
    //将data对象保存到vm和局部变量data上
    var data = this._data = this.$options.data;
    //将vm保存到变量me上
    var me = this;

    // 数据代理
    // 实现 vm.xxx -> vm._data.xxx
    //key是data中的每个key
    Object.keys(data).forEach(function(key) {
        me._proxy(key);
    });
    
    //对data中所有层次属性进行监视劫持，创建observer和dep
    observe(data, this);
    //创建一个编译对象(编译模板)
    //编译模板创建watcher
    this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },

    _proxy: function(key) {
        var me = this;
        //给vm添加指定的属性
        Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter() {
                return me._data[key];
            },
            set: function proxySetter(newVal) {
                me._data[key] = newVal;
            }
        });
    }
};