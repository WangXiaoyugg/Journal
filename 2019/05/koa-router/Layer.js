var debug = require("debug")("koa-router")
var pathToRegExp = require("path-to-regexp")
var uri = require("urljs")

function Layer(path, methods, middlware, opts) {
    this.opts = opts || {}
    this.name = this.opts.name || null;
    this.methods = []
    this.paramNames = [];
    this.stack = Array.isArray(middlware) ? middlware: [middlware]

    // forEach 中传this, 相当于forEach 执行的上下文
    // l-1, this;
    methods.forEach(function(method){
        //  push 返回的是数组长度， 将每个method 都变成大写
        var l = this.methods.push(method.toUpperCase())
        // 如果this.methods 的最后一个元素 是 GET, 就在method的第一位插入 “HEAD”
        if(this.methods[l - 1] === 'GET') {
            this.methods.unshift('HEAD')
        }
    }, this);

    // 确保中间件是一个函数. 
    this.stack.forEach(function(fn) {
        var type = typeof fn;
        if(type !== 'function') {
            throw new Error(
                methods.toString() + " `" + (this.opts.name || path) + "`:`middleware` "
                + "must be a function, not`"+ type +"`"
            )
        }
    }, this);

    this.path = path;
    /**
     * const keys = []
     * const regexp = pathToRegexp('/foo/:bar', keys)
     * regexp = /^\/foo\/([^\/]+?)\/?$/i
     * keys = [{ name: 'bar', prefix: '/', delimiter: '/', optional: false, repeat: false, pattern: '[^\\/]+?' }] 
     * 
     * */
    this.regexp = pathToRegExp(path, this.paramNames, this.opts);
    debug("defined route %s %s", this.methods, this.opts.prefix + this.path);
}

/**
 * Returns whether request `path` matches route.
 *
 * @param {String} path
 * @returns {Boolean}
 * @private
 */
Layer.prototy.match = function (path) {
    return this.regexp.test(path)
}

/**
 * Prefix route path.
 *
 * @param {String} prefix
 * @returns {Layer}
 * @private
 */
Layer.prototype.setPrefix = function (prefix) {
    if(this.path) {
        this.path = prefix + this.path
        this.paramNames = []
        this.regexp = pathToRegExp(this.path, this.paramNames, this.opts)
    }
    return this;
}

Layer.prototype.url = function (params, options) {
    // this.path '/users/:id'
    // params, [ {id: 1}, {query: { active: true }}]
    var args = params;
    // 把 path 字符串中 "(.*)" 给变成空
    var url = this.path.replace(/\(\.\*\)/g, '')

    // const toPath = pathToRegexp.compile('/user/:id')

    // toPath({ id: 123 }) //=> "/user/123"
    // toPath({ id: 'café' }) //=> "/user/caf%C3%A9"
    // toPath({ id: '/' }) //=> "/user/%2F"
    // toPath({ id: ':/' }) //=> "/user/%3A%2F"
    // toPath({ id: ':/' }, { encode: (value, token) => value }) //=> "/user/:/"

    // toPath(data, options)
    var toPath = pathToRegExp.compile(url); // 变成了函数
    var replaced;

    // 不是数组或者对象
    if(typeof params !== 'object') {

        args = Array.prototype.slice.call(arguments)
        // 如果 args 数组的最后一个 是对象
        if(typeof args[args.length - 1] === 'object') {
            // 把最后一个最为options
            options = args[args.length - 1]
            // 把最后参数去掉，修改args
            args = args.slice(0, args.length - 1);
        }
    }

    /**
     * 
     * const tokens = pathToRegexp.parse('/route/:foo/(.*)')
     * console.log(tokens[0])
     * //=> "/route"
     * console.log(tokens[1])
     * //=> { name: 'foo', prefix: '/', delimiter: '/', optional: false, repeat: false, pattern: '[^\\/]+?' }
     * console.log(tokens[2])
     * //=> { name: 0, prefix: '/', delimiter: '/', optional: false, repeat: false, pattern: '.*' 
     * 
     * */

    // ['/users', {name: "id", prefix: "/", delimiter: '/', optional: false, pattern: "[^\/]+?"}, repeat: false]
    var tokens = pathToRegExp.parse(url);
    var replace = {};

    if (args instanceof Array) {
        for (var len  = tokens.length, i=0, j=0; i < len; i++) {
            if (tokens[i].name) {
                replace[tokens[i].name] = args[j++];
            }
        }     
    } else if (tokens.some(token => token.name)) {
        replace = params;
    } else {
        options = params;
    }
    // replace => {id: {id: 1}}

    replaced = toPath(replace);

    if (options && options.query) {
        var replaced = new uri(replaced)
        replaced.search(options.query)
        return replaced.toString();
    }

    return replaced;

}

