'use strict';

// Axios 一些默认配置
var utils = require("./utils")
var normalizeHeaderName = requrie('./helpers/normalizeHeaderName')

const DEFAULT_CONTENT_TYPE = {
    "Content-Type": "application/x-www-form-urlencoded"   
}

function setContentTypeIfUnset(headers, value) {
    if(!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
        headers['Content-Type'] = value;
    }
}
function getDefaultAdapter() {
    var adapter;
    if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
        adapter = require('./adapters/http')
    } else {
        adapter = require('./adapters/xhr')
    }
    return adapter;
}

var defaults = {
    adapter: getDefaultAdapter(),  // 适配器决定环境
    // `transformRequest` allows changes to the request data before it is sent to the server
    // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
    // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
    // FormData or Stream
    // You may modify the headers object
    transformRequest: [
        function transformRequest(data, headers) {
            normalizeHeaderName(headers, 'Accept')
            normalizeHeaderName(headers, 'Content-Type')
            if(utils.isFormFata(data) ||
               utils.isArrayBuffter(data) ||
               utils.isStream(data) ||
               utils.isFile(data)  ||
               utils.isBlob(data) 
            ) {
                return data;
            }

            if(utils.isArrayBuffterView(data)) {
                return data.buffer;
            }

            if(utils.isURLSearchParams(data)) {
                setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8')
                return data.toString()
            }

            if(utils.isObject(data)) {
                setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8')
                return JSON.stringify(data)
            }
            return data;

        },
    ],
    // `transformResponse` allows changes to the response data to be made before
    // it is passed to then/catch
    transfromResponse: [
        function transfromResponse(data) {
            if(typeof data === 'string') {
                try {
                    data = JSON.parse(data)
                }catch(e) {

                }
            }
            return data;
        }
    ],
    // 使用 毫秒数设置请求的超时，设置为0 表示不创建超时设置
    timeout: 0,

    // xsrf === csrf
    // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
    xsrfCookieName: 'XSRF-TOKEN',
    // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
    xsrfHeaderName: "X-XSRF-TOKEN",

    maxContentLength: -1,

    validateStatus: function validStatus(status) {
        return status >= 200 && status < 300;
    }
};

defaults.headers = {
    common: {
        "Accept": "application/json, text/plain, */*"
    }
}

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
    defaults.headers[method] = {}
})

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
})


module.exports = defaults;