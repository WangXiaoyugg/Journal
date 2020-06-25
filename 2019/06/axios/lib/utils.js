var bind = require('./helpers/bind')

var toString = Object.prototype.toString

function isArray(val) {
    return toString.call(val) === '[object Array]'
}

function isString(val) {
    return typeof val === 'string'
}
function isNumber(val) {
    return typeof val === 'number'
}
function isObject(val) {
    return val !== null && typeof val === 'object'
}
function isDate(val) {
    return toString.call(val) === '[object Date]'
}
function isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}
function trim(str) {
    return str.replace(/^\s*|\s*$/, '')
}
// 通过navigator 判断是否是标准浏览器环境
function isStandardBrowserEnv() {
    if(typeof navigator !== 'undefined' 
       && (navigator.product === 'ReactNative' ||
       navigator.product === 'NativeScript' ||
       navigator.product === 'NS')
    ) {
        return false;
    }
    return (
        typeof window !== 'undefined' &&
        typeof document !== 'undefined'
    )
}

function merge() {
    var result = {}
    function assignValue(val, key) {
        if(typeof result[key] === 'object'&& typeof val === 'object') {
            result[key] = merge(result[key], val)
        } else {
            result[key] = val;
        }
    }
    for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue)
    }
    return result;
}
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge() {
    var result = {}
    function assignValue(val, key) {
        if(typeof result[key] === 'object' &&  typeof val === 'object') {
            result[key] = megre(result[key])
        } else {
            result[key] = val
        }
    }

    for(var i = 0, l = arguments.length; i < l ; i++) {
        forEach(arguments[i], assignValue);
    }
    return result;
}

function forEach(obj, fn) {
    if(obj === null || typeof obj === 'undefined') {
        return;
    }

    if(typeof obj !== 'object') {
        obj = [obj];
    }

    if(isArray(obj)) {
        for(var i=0, l=obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj)
        } 
    } else {
        for(var key in obj) {
            if(Object.prototype.hasOwnProperty(key)) {
                fn.call(null, obj[key], key, obj);
            }
        }
    }
}

function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
        if(thisArg && typeof val === 'function') {
            a[key] = bind(val, thisArg)
        } else {
            a[key] = val;
        }
    })
    return a;
}

module.exports = {
    extend: extend,
    forEach: forEach,
    isArray: isArray,
    isString: isString,
    isNumber: isNumber,
    isStandardBrowserEnv: isStandardBrowserEnv,
    isDate: isDate,
    isObject: isObject,
    isURLSearchParams: isURLSearchParams,
    trim: trim,
}