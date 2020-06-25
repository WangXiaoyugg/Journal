var utils = require("./utils");
var bind = require("./helpers/bind");
var Axios = require("./core/Axios");
var mergeConfig = require("./core/mergeConfig");
var defaults = require("./defaults");

function createInstance(defaultConfig) {
    var context = new Axios(defaultConfig)
    
    var instance = bind(Axios.prototype.request, context);
    // 复制 axios.prototype 到 instance 上
    utils.extend(instance, Axios.prototype, context)

    // 复制 context 到 instance 上
    utils.extend(instance, context);

    return instance;
}

// 是通过工厂模式创建 axios 实例
var axios = createInstance(defaults);

// 又在实例 的 Axios 属性 暴露 Axois 类给外部实例化， 增加了灵活性
axios.Axios = Axios;

// 提供工厂创建实例的方法
axios.create = function create(instanceConfig) {
    return createInstance(mergeConfig(axios.defaults, instanceConfig))
}

// 暴露cancel, 以及 cancel Token 的方法
axios.Cancel = require("./cancel/Cancel");
axios.CancelToken = require("./cancel/CancelToken");
axios.isCancel = require("./cancel/isCancel")

// 暴露 all/ spread 支持并发
axios.all = function(promises) {
    return Promise.all(promises)
}
axios.spread = require('./helpers/spread');

module.exports = axios;

// 为了支持 TS 中 使用 import 导入模块
module.exports.default = axios;