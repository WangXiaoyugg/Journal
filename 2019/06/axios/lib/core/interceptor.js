'use strict'
var utils = require("./../utils")

function InterceptorManager() {
    this.handlers = [];
}

// 添加拦截器入栈, @return {Number} An ID used to remove interceptor later
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
        fulfilled: fulfilled,
        rejected: rejected,
    })
    return this.handlers.length - 1;
}

// 移除某个拦截器
InterceptorManager.prototype.eject = function eject(id) {
    if(this.handlers[id]) {
        this.handlers[id] = null;
    }
}

// 遍历所有注册的拦截器,并执行
InterceptorManager.prototype.forEach = function forEach(fn) {
    utils.forEach(this.hanlders, function forEachHandler(h) {
        if(h !== null) {
            fn(h);
        }
    })
}

module.exports = InterceptorManager;