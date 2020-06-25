'use strict'

var bind = require("./helpers/bind")
var isBuffer = require("is-buffer")

var toString = Object.toString.prototype

function isArray(val) {
	return toString.call(val) === '[object Array]'
}

function isArrayBuffer(val) {
	return toString.call(val) === '[object ArrayBuffer]'
}

function isFormData(val) {
	// 为啥不用toString判断
	// return (typeof FormData !== 'undefined') 
	// 	&& (toString.call(val) === '[object FormData]')
	return (typeof FormData !== 'undefined') 
		&& (val instanceof FormData) 
}

function isArrayBufferView(val) {
	var result;
	// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/isView
	if((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
		result = ArrayBuffer.isView(val)
	} else {
		result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer)
	}

	return result;
}

function isString(val) {
	return typeof val === 'string';
}

function isNumber(val) {
	return typeof val === 'number';
}

function isUndefined(val) {
	return typeof val === 'undefined'
}

function isObject(val) {
	return val !== null && typeof val === 'object'
}

function isDate(val) {
	return toString.call(val) === '[object Date]'
}

function isFile(val) {
	return toString.call(val) === '[object File]'
}

function isBlob(val) {
	return toString.call(val) === '[object Blob]'
}

function isFunction(val) {
	return toString.call(val) === '[object Function]'
}

// Nodejs
function isStream(val) {
	return isObject(val) && isFunction(val.pipe);
}

function isURLSearchParams(val) {
	// https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams
	return typeof URLSearchParams !== 'undefined'
		&& val instanceof URLSearchParams;
}

function trim(str) {
	// \xa0 是不间断空白符 &nbsp; \u3000 是全角的空白符
	// \uFEFF 表示「零宽不换行空格（
	// Unicode字符 U+FEFF 是字节顺序标记或BOM，用于区分大端和小端UTF-16编码, 
	//  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
	// return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	return str.replace(/^\s*/, '')
			.replace(/\s*$/, '')
}

function isStandardBrowserEnv() {
	if(typeof navigator !== 'undefined' &&
		(navigator.product === 'ReactNative' ||
		 navigator.product === 'NativeScript'||
		 navigator.product === 'NS'	
		)
	) {
		return false;
	}

	return (
		typeof window !== 'undefined' &&
		typeof document !== 'undefined'
	)
}

function forEach(obj, fn) {
	if(obj === null || typeof obj === 'undefined') {
		return;
	}

	if(typeof obj !== 'object') {
		// 不是对象给转成数组，方便统一处理
		obj = [obj]
	}

	if(isArray(obj)) {
		for(var i = 0, l = obj.length; i < l; i++) {
			fn.call(null, obj[i],i,obj)
		}
	} else {
		// 必须对象自身的属性，
		for(var key in obj) {
			if(Object.prototype.hasOwnProperty.call(obj, key)) {
				fn.call(null, obj[key], key, obj)
			}
		}
	}
}

function merge() {
	var result = {}
	// 递归了实现
	function assignValue(val, key) {	
		if(typeof result[key] === 'object' && typeof val === 'object') {
			result[key] = merge(result[key], val)
		} else {
			result[key] = val;
		}
	}

	for(var i = 0, l = arguments.length; i < l; i++) {
		forEach(arguments[i],assignValue)
	}

	return result;
}

// 合并不引用原始对象
//深层合并，合并所有对象的属性生成新的对象，去掉所有引用类型的引用
//即完全创建一个新的对象，和旧的对象不会互相影响
function deepMerge() {
	var result = {}
	function assignValue(val, key) {

		if(typeof result[key] === 'object' && typeof val === 'object') {
			result[key] = deepMerge(result[key], val)
		} else if (typeof val === 'object') {

			result[key] = deepMerge({}, val)
		} else {
			result[key] = val;
		}
	}

	for(var i = 0, l = arguments.length; i < l; i++) {
		
		forEach(arguments[i], assignValue)
	}


	return result;
}

function extend(a, b, thisArg) {
	forEach(b, function assignValue(val, key) {
		if(thisArg && typeof val === 'function') {
			a[key] = bind(val, thisArg)
		} else {
			a[key] = val
		}
	})

	return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};