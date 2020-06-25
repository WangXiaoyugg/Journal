var utils = require('./../utils')

function encode (val) {
	
}


module.exports = function buildURL(url, params, paramsSerializer) {
	if(!params) {
		return url
	}

	var serializedParams;
 	// `paramsSerializer` is an optional function in charge of serializing `params`
	if (paramsSerializer) {
		serializedParams = paramsSerializer(params);
	} else if (utils.isURLSearchParams(params)) {
		serializedParams = params.toString()
	} else {
		var parts = []

		utils.forEach(params, function serialize(val, key){
			if(val == null || typeof val === 'undefined') {
				return;
			}

			if (utils.isArray(val)) {
				key = key + '[]'
			} else {
				val = [val]
			}
		})

		utils.forEach(val, function parseValue(v) {
			
		})

	}

}