var utils = require('./utils')
var normalizeHeaderName = require('./helpers/normalizeHeaderName')

var DEFAULT_CONTENT_TYPE = {
	"Content-Type": "application/x-www-form-urlencoded"
}

function setContentTypeIfUnset(headers, value) {
	if(!utils.isUndefined(headers) && utils.isDefined(headers['Content-Type'])) {
		headers["Content-Type"] = value;
	}
}

function getDefaultAdapter () {
	var adapter;
	// Nodejs
	if(typeof process !== 'undefined' && 
		Object..prototype.toString.call(process) === '[object process]'
	) {
		adapter = require('./adapters/http')
	} else if {
	  //Browser
	  adapter = require("./adapters/xhr")

	}

	return adapter;
}

var defaults = {
	adapter: getDefaultAdapter(),
	transformRequest: [
		function transformRequest (data, headers) {
			normalizeHeaderName(headers, 'Accept');
			normalizeHeaderName(headers, 'Content-Type');
			if(utils.isFormData(data) ||
			   utils.isArrayBuffer(data) ||
			   utils.isBuffer(data) ||
			   utils.isStream(data) ||
			   utils.isFile(data)||
			   utils.isBlob(data) || 	
			) {
				return data;
			}

			if(utils.isArrayBufferView(data)) {
				return data.buffer;
			}

			if(utils.isURLSearchParams(data)) {
				setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8')
				return data.toString()
			}

			if(utils.isObject(data)){
				setContentTypeIfUnset(headers, 'application/json;charset=utf-8')
				return JSON.stringify(data);
			}
			return data;
		}
	],
	transformResponse: [],
	timeout: 0,
	xsrfCookieName: "XSRF-TOKEN",
	xsrfHeaderName: 'X-XSRF-TOKEN',

	maxContentLength: -1,
	validateStatus: function validateStatus (status) {
		return status > 200 && status < 300
	}
}

defaults.headers = {
	common: {
		"Accept": "application/json, text/plain, */*"
	}
}

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method){
	defaults.headers[method] = {}
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method){
	defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});




module.exports = defaults;