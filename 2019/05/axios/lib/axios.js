'use strict'
var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require("./core/Axios")
var defaults = require("./defaults")
var mergeConfig = require('./core/mergeConfig');

// 工厂方法，创建axios 实例
function createInstance (defaultConfig) {
	 var context = new Axios(defaultConfig);

	 var instance = bind(Axios.prototype.request, context)

	 // Copy axios.prototype to instance
	 utils.extend(instance, Axios.prototype, context)
	 utils.extend(instance, context)
	 return instance;
}

var axios = new createInstance(defaults)

// / Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
	return createInstance(
		mergeConfig(axios.defaultConfig, instanceConfig)
	)
}
// Expose Cancel & CancelToken, 取消发送的请求
axios.Cancel = require("./cancel/Cancel")
axios.CancelToken = require("./cancel/CancelToken")
axios.isCancel = require('./cancel/isCancel')

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
axios.all = function all(promises) {
	return Promise.all(promises);
}
axios.spread = require('./helpers/spread')

// NodeJS
module.exports = axios;

// TypeScript
module.exports.default = axios;
