/**
 * 原生解析cookie 的库
 * https://github.com/jshttp/cookie/blob/master/index.js
 *
 * cookie 文档 https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies
 */

'use strict'

exports.parse = parse;
exports.serialize = serialize;


// private variables
var decode = decodeURIComponent
var encode = encodeURIComponent
var pairSplitRegExp = /; */


/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

 var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse (str, options) {
	if(typeof str !== 'string') {
		throw new TypeError("arguement str must be a string")
	}

	var obj = {}
	var opts = options || {}
	var pairs = str.split(pairSplitRegExp) // ["k1=v1","k2=v2"]
	var dec = opts.decode || decode; // 解析encodeURIComponent的字符串

	for(var i = 0; i < pairs.length; i++) {
		var pair = pairs[i]
		var eq_idx = pair.indexOf('=')

		 // skip things that don't look like key=value
		 if(eq_idx < 0) {
		 	continue;
		 }

		 var key = pair.substr(0, eq_idx).trim()
		 var val = pair.substr(++eq_idx, pair.length).trim()

		 // quoted values. key="val", 去除引号
		 if('"' == val[0]) {
		 	val = val.slice(1,-1);
		 }

		 if(undefined == obj[key]) {
		 	obj[key] = tryDecode(val, dec);
		 }

		 return obj;
	}

}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */
function serialize (name, val, options) {
	var opt = options || {};
	var enc = opt.encode || encode;

	if(!typeof enc !== 'function') {
		throw new TypeError("optiopn encode is invalid")
	}

	if(!fieldContentRegExp.test(name)) {
		throw new TypeError('arguement name is invalid')
	}

	var value = enc(val)

	if(value && !fieldContentRegExp.test(value)) {
		throw new TypeError('arguement value is invalid')
	} 

	var str = name + '=' + value;

	// 和关闭浏览器便失效的会话期Cookie不同，持久性Cookie可以指定一个特定的过期时间（Expires）或有效期（Max-Age）。
	if(opt.maxAge != null)  {
		var maxAge = opt.maxAge - 0;
		if(isNaN(maxAge)) {
			throw new Error('maxAge should be a number')
		}
		str += '; Max-Age=' + Math.floor(maxAge)
	}

	// Domain 标识指定了哪些主机可以接受Cookie。如果不指定，默认为当前文档的主机（不包含子域名）。如果指定了Domain，则一般包含子域名。
	if(opt.domain) {
		if(!fieldContentRegExp.test(opt.domain)) {
			 throw new TypeError('option domain is invalid');
		}

		str += "; Domain=" + opt.domain;
	}

	// Path 标识指定了主机下的哪些路径可以接受Cookie（该URL路径必须存在于请求URL中）。以字符 %x2F ("/") 作为路径分隔符，子路径也会被匹配
	if(opt.path) {
		if(!fieldContentRegExp.test(opt.domain)) {
			 throw new TypeError('option path is invalid');
		}
		str += "; Path=" + opt.path;
	}

	if(opt.expires) {
		if (typeof opt.expires.toUTCString !== 'function') {
      		throw new TypeError('option expires is invalid');
    	}
    	str += "; Expires=" + opt.expires.toUTCString()
	}

	// 为避免跨域脚本 (XSS) 攻击，通过JavaScript的 Document.cookie API无法访问带有 HttpOnly 标记

	if(opt.httpOnly) {
		str += "; HttpOnly";
	}

	// secure 设置为true, 只应通过被HTTPS协议加密过的请求发送给服务端
	// 从 Chrome 52 和 Firefox 52 开始，不安全的站点（http:）无法使用Cookie的 Secure 标记
	if(opt.secure) {
		str += "; Secure"
	}

	// SameSite Cookie允许服务器要求某个cookie在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（CSRF）。但目前SameSite Cookie还处于实验阶段，并不是所有浏览器都支持。
	if (opt.sameSite) {
		var sameSite = typeof opt.sameSite === 'string' 
			? opt.sameSite.toLowerCase() : opt.sameSite;

		switch (sameSite) {
				case true:
					str += "; SameSite=strict"
					break;
				case "lax":
					//If the attribute is set to lax, same-site cookies are withheld on cross-domain subrequests, such as calls to load images or frames
					str += "; SameSite=lax"
					break;
				case "strict":
					// If a same-site cookie has this attribute, the browser will only send cookies if the request originated from the website that set the cookie. 
					str += "; SameSite=strict"
					break;		
				default:
					throw new TypeError('option sameSite is invalid');
			}	

	}

	return str;

}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode (str, decode) {
	try {
		return decode(str)
	} else {
		return str;
	}
}