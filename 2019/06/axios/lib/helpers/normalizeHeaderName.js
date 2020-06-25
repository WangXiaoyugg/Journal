var utils = require('../utils')

module.exports = function normalizeHeaderName(headers, normalizedName){
    utils.forEach(headers, function processHeader(value, name) {
        if(name !== normalizeHeaderName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizeHeaderName] = value;
            delete headers[name];
        }
    })
}