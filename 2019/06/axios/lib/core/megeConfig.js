var utils = require('../utils')

module.exports = function mergeConfig(config1, config2) {
    config2 = config2 || {}
    var config = {}
    utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop){
        if(typeof config2[prop] !== 'undefined') {
            config[prop] = config2[prop];
        }
    })

    utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
        if(utils.isObject(config2[prop])) { 
            config[prop] = until.deepMerge(config1[prop], config2[prop])
        } else if (typeof config2[prop] !== 'undefined') {
            config[prop] = config2[prop]    
        } else if (utils.isObject(config1[prop])) {
            config[prop] = utils.deepMerge(config1[prop])
        } else if (typeof config1[prop] !== 'undefined') {
            config[prop] = config1[prop];
        }
     })

    utils.forEach([
        'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
        'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
        'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
        'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
        'socketPath'
    ], function defaultToConfig2(prop) {
        if (typeof config2[prop] !== 'undefined') {
            config[prop] = config2[prop]
        } else if(typeof config1[prop] !== 'undefined') {
            config[prop] = config1[prop]
        }
    }) 
    return config;

}