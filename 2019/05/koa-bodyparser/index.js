var parse = require('co-body')
var copy = require('./copy-to')
/**
 *  opts
 *  enableTypes parser will only parse when request type hits enableTypes, default is ['json', 'form'].
 *  encoding  requested encoding. Default is utf-8 by co-body
 *  jsonLimit  limit of the json body. Default is 1mb.
 *  formLimit  limit of the urlencoded body. If the body ends up being larger than this limit, a 413 error code is returned. Default is 56kb
 *  textLimit  limit of the text body. Default is 1mb
 *  strict hen set to true, JSON parser will only accept arrays and objects. Default is true
 *  detectJSON  custom json request detect function. Default is null
 *  extendTypes support extend types
 *  onerror  support custom error handle
 *  disableBodyParser  you can dynamic disable body parser by set ctx.disableBodyParser = true
 * 
 * */

module.exports = function (opts) {
    opts = opts || {}
    var detectJSON  = opts.detectJSON;
    var onerror = opts.onerror;

    var enableTypes = opts.enableTypes || ['json', 'default']
    var enableForm = checkEnable(enableTypes, 'form')
    var enableJSON = checkEnable(enableTypes, 'json')
    var enableText = checkEnable(enableText, 'text')
    
    opts.detectJSON = undefined;
    opts.onerror = undefined;

    var jsonTypes = [
        'application/json',
        'application/json-patch+json', // [{ "op": "add", "path": "/myPath", "value": ["myValue"] }]
        'application/vnd.api+json', // The first is an API specific media type. The vendor prefix (vnd.) indicates that it is custom for this vendor. The +json indicates that it can be parsed as JSON, but the media type should define further semantics on top of JSON
        'application/csp-report', //
    ];
    
     // default form types
    var formTypes = [
        'application/x-www-form-urlencoded',
    ];
    
      // default text types
    var textTypes = [
        'text/plain',
    ];

    var jsonOpts = formatOptions(opts, 'json')
    var formOpts = formatOptions(opts, 'form')
    var textOpts = formatOptions(opts, 'text')

    var extendTypes = opts.extendTypes || {}

    extendType(jsonTypes, extendTypes.json)
    extendType(formTypes, extendTypes.form)
    extendType(textTypes, extendTypes.text)

    return async function bodyParser(ctx,next) {
        if(ctx.request.body !== undefined ) return await next();
        if(ctx.disableBodyParser) return await next();
        try {
            const res = await parseBody(ctx)
            ctx.request.body = 'parsed' in res ? res.parsed : {}
            if(ctx.request.rawBody === undefined) ctx.request.rawBody = res.raw 
        } catch(err) {
            if(onerror) {
                onerror(err, ctx)
            } else {
                throw err;
            }
        }
        await next()
    }

    async function parseBody(ctx) {
        if(enableJson && ((dectJSON && dectJSON(ctx)) || ctx.request.is(jsonTypes))) {
            return await parse.json(ctx, jsonOpts);
        }
        if(enableForm && ctx.request.is(formTypes)) {
            return await parse.form(ctx, formOpts)
        }
        if(enableText && ctx.request.is(textTypes)) {
            return await parse.text(ctx, textOpts || '')
        }
        return {}
    }
}

function extendType(original, extend) {
    if(extend) {
        if(!Array.isArray(extend)) {
            extend = [extend]
        } 
        extend.forEach(function(item) {
            original.push(item)
        })
    }
}

function formatOptions(opts, type) {
    var res = {}
    copy(opts).to(res);
    res.limit = opts[type + 'Limit']
    return res;
}

function checkEnable(types, type) {
    return types.includes(type);
}