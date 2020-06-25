var debug = reuqire('debug')("koa-router")
var compose = require("koa-compose")
var HttpError = require("http-errors")
var methods = require("methods")
var Layer = require("./layer")

module.exports = Router;

/**
 * API
 * Router
 *      new Router([opts])
 * Router.instance
 *      .get|put|post|patch|delete|del
 *      .routes
 *      .use([path], middleware)
 *      .prefix(prefix)
 *      .allowedMethods([options])
 *      .redirect(source, destination, [code])
 *      .route(name)
 *      .url(name, params, [options])
 *      .param(param, middleware)
 * Router static
 *      .url(path, params)
 * */

/**
 * @example
 * Basic usage
 * var Koa = require("koa")
 * var Router = require("koa-router")
 * var app = new Koa()
 * var router = new Router()
 * router.get("/", (ctx, next) => {})
 * app.use(router.routes())
 *    .use(router.allowedMethods())
 * 
 * @alias module: koa-router
 * @param {Object=} opts
 * @param {String=} opts.prefix
 * @constructor
 */ 

function Router(opts) {
    if (!this instanceof Router) {
        return new Router(opts)
    }

    this.opts = opts || {};
    this.methods = this.opts.methods || [
        'HEAD',
        'OPTIONS',
        'GET',
        'PUT',
        'PATCH',
        'POST',
        'DELETE',
    ]
    this.params = {};
    this.stack = [];
}

/**
 * var url = Router.url('/users/:id', {id: 1});
 * // => "/users/1"
 * const url = Router.url('/users/:id', {id: 1}, {query: { active: true }});
 * // => "/users/1?active=true"
 * */
Router.url = function (path, params) {
    // 参数 去掉path, 作为Layer.prototype.url 方法的this的上下文
    var args = Array.prototype.slice.call(arguments, 1);
    // [ {id: 1}, {query: { active: true }}]
    return Layer.prototype.url.apply({path: path}, args);
}


