const http = require('http')

function compose (middlewares) {
	return function (ctx) {
		function dispatch(i) {
			const fn = middlewares[i];
			try {
				Promise.resolve(
					// async((ctx, next) => {})
					fn(ctx, dispatch.bind(null, i + 1))
				)
			}catch(e) {
				Promise.reject(e);
			}
		}
		return dispatch(0);
	}
}

class Koa {
	constructor() {
		this.middlewares = []
	}

	use(fn) {
		this.middlewares.push(fn)
		return this;
	}

	callback() {
		// 组合中间件的列表
		const fn = compose(this.middlewares)
		return (req, res) => {
			let ctx = {req, res}
			ctx.query = req.query;
			return fn(ctx);
		}
	}

	listen(...args) {
		const server = http.createServer(this.callback());
		server.listen(...args);
	}
}

module.exports = Koa;

