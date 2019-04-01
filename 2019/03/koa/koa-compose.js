module.exports = compose;

/**
 * @param {Array}  middleware
 * @return {Function} 
 * @api public
 */

/**
 * https://segmentfault.com/a/1190000013447551
 * https://juejin.im/post/5b5e6b1e5188251ac22b5e5e
 * https://www.cnblogs.com/tugenhua0707/p/10204009.html
 * https://www.jianshu.com/p/5d0f1d9ef746
 * https://www.jianshu.com/p/2439dfef430d
 * https://juejin.im/post/59c00a39f265da064c3853b7
 * https://segmentfault.com/a/1190000009158828
 * https://zhuanlan.zhihu.com/p/23525034
 *
 * // 推荐傻瓜式解读koa-compose 处理模块
 * https://www.jishuwen.com/d/2s4B#tuit
 */

function compose(middleware) {
	if(!Array.isArray(middleware)) throw new TypeError("middleware must be a Array")
	for(const fn of middleware) {
		if(typeof fn !== 'function') throw new TypeError("Middleware must be composed of functions!")
	}	
	
	/**
	 * @param {Object} context
	 * @return {Promise} 
	 * @api public 
	 */
	return function(context, next) {
		// last called middleware
		let index = -1
		return dispatch(0)
		function dispatch(i){
			if(i <= index) return Promise.reject(new Error("next() called multiple times"))
			index = i
			let fn = middleware[i]
			if(i === middleware.length) fn = next;
			if(!fn) return Promise.reslove()
			try {
				return Promise.resolve(fn(context, 
					dispatch.bind(null, i+1))
				);
			}catch(err) {
				return Promise.reject(err);
			}		

		}
	}	
}