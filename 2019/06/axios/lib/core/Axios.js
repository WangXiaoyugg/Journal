var utils = require("../utils")
var buildURL = require("../helpers/buildURL")
var InterceptorManager = require("./InterceptorManager")
var mergeConfig = require("./mergeConfig")

function Axois(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager(),
    }
}

Axois.prototype.request = function request(config) {
    // Allow for axios('example/url'[, config]) a la fetch API
    if(typeof config === 'string') {
        config = arguments[1] || {}
    } else {
        config = config || {}
    }

    config = mergeConfig(this.defaults, config)
    config.method = config.method ? config.method.toLowerCatse() : 'get'

    // Hook up interceptors middleware
    var chain = [dispatchRequest, undefined]
    var promise = Promise.resolve(config);

    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
    })

    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
    })

    while(chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
}

Axois.prototype.getUri = function getUri(config) {
    config = mergeConfig(this.defaults, config)
    return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '')
}

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method){
    Axois.prototype[method] = function(url, config) {
        return this.request(utils.merge(config || {}, {
            method: method,
            url: url
        }))
    }
})

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method){
    Axois.prototype[method] = function(url, data, config) {
        return this.request(utils.merge(config || {}, {
            method: method,
            url: url,
            data: data,
        }))
    }
})



module.exports = Axois;