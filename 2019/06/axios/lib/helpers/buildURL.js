var utils = require("./../utils");

// 对val 进行encode, 对encode后一些特殊字符进行处理
function encode(val) {
    return encodeURIComponent(val).
        replace(/%40/gi, '@').
        replace(/%3A/gi, ':').
        replace(/%24/g, '$').
        replace(/%2C/gi, ',').
        replace(/%20/g, '+').
        replace(/%5B/gi, '[').
        replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */

module.exports = function buildURL(url, params, paramsSerializer) {
    if(!params) {
        return url;
    }

    var serilizedParams;
    if(paramsSerializer) {
        serilizedParams = paramsSerializer(params);
    } else if (utils.isURLSearchParams(params)) {
        // https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams
        serilizedParams = params.toString();
    } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key){
            if(val === null || val === 'undefined') {
                return;
            }
            if(utils.isArray(val)) {
                key  = key + '[]'
            } else {
                val = [val];
            }

            utils.forEach(val, function parseValue(v) {
                if(utils.isDate(v)) {
                    v = v.toISOString()
                } else if (utils.isObject(v)) {
                    v = JSON.stringify(v)
                } 
                parts.unshift(encode(key) + '='+ encode(v))
            })
        })

        serilizedParams = parts.join("&")

    }

    if(serilizedParams) {
        var hasmarkIndex = url.indexOf('#');
        if(hasmarkIndex !== -1) {
            url = url.slice(0, hasmarkIndex);
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serilizedParams
    }

    return url;
}


