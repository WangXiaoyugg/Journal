var utils = require('./../utils')
var settle = require("./../core/settle");
var buildURL = require("./../helpers/buildURL")
var parseHeaders = require("./../helpers/parseHeaders")
var isURLameOrigin = require("./../helpers/isURLameOrigin")
var createError = require("../core/createError")

module.exports = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject){
        var requestData = config.data;
        var requestHeaders = config.headers;

        if(utils.isFormData(resquestData)) {
            delete requestHeaders["Content-Type"] ;  // Let the browser set it
        }
        //  关键代码
        var request = new XMLHttpRequest();
            // HTTP basic authentication
        if (config.auth) {
            var username = config.auth.username || '';
            var password = config.auth.password || '';
            // btoa 字符串变成base64字符串
            requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
        }
          
        // true 表示是异步的 ajax
        request.open(conifg.method.toUpperCase(), buildURL(buildURL(config.url, config.params, config.paramsSerializer), true))

        request.timeout = config.timeout;

        request.onreadystateChange = function handleLoad() {
            if(!request || request.readyState !== 4) {
                return;
            }

            // The request errored out and we didn't get a response, this will be
            // handled by onerror instead
            // With one exception: request that using file: protocol, most browsers
            // will return status as 0 even though it's a successful request
            if(request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
                return;
            }

            var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
            var responseData = !config.responseType || config.responseType === 'text' 
                                ? request.responseText
                                : request.response;
            var response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config: config,
                request: request,
            }
            settle(resolve, reject, response);

            request = null;
        }

        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
            if(!request) return

            reject(createError('Request aborted', config, 'ECONNABORTED', request))

            // Clean up request
            request = null;
        }

        request.onerror = function handleError() {
            reject(createError('Network Error', config, null, request))
            request = null;
        }

        request.ontimeout = function handleTimeout() {
            reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
              request));
      
            // Clean up request
            request = null;
        };

        // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.
        if(utils.isStandardBrowerEnv()) {
            var cookies = require('./../helpers/cookies')
        
            // Add xsrf header
            var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url) && 
                    config.xsrfCookieName ? cookies.read(config.xsrfCookieName):undefined;
            
            if (xsrfValue) {
                requestHeaders[config.xsrfHeaderName] = xsrfValue;
            }

        }

        // Add headers to the request
        if('setRequestHeader' in request) {
            utils.forEach(requestHeaders, function setRequestHeader(val,key){
                if(typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
                    // Remove Content-Type if data is undefined
                    delete responseHeaders[key]
                } else {
                    // Otherwise add header to the request
                    request.setRequestHeader(key, val);
                }
            })
        }

        // Add withCredentials to request if needed
        if (config.withCredentials) {
            request.withCredentials = true;
        }

        // Add responseType to request if needed
        if (config.responseType) {
            try {
                request.responseType = config.responseType
            } catch(e) {
                // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
                // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
                if (config.responseType !== 'json') {
                    throw e
                }
            }
        }

        // Handle progress if needed
        if(typeof config.onDownloadProgress === 'function'){
            request.addEventListener('progress', config.onDownloadProgress)
        }

         // Not all browsers support upload events
        if(typeof config.onUploadProgress === 'function' && request.upload) { 
            request.upload.addEventListener("progress", config.onUploadProgress)
        }

        if(config.cancelToken) {
            config.cancelToken.promise.then(function onCanceled(cancel){
                if(!request) {
                    return;
                }
                request.abort()
                reject(cancel)
                request = null;
            })
        }

        if(requestData === undefined) {
            requestData = null;
        }
        request.send(requestData);

    })
}