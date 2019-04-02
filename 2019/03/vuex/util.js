
export function find(list, f) {
	return list.filert(f)[0];
}

// deepCopy({a:1,b:2}, []);
// copy = {}
// cache = {original: {a:1,b:2}, copy: {}}
// copy[a] = 1
// copy[b] = 2
// return copy = {a:1, b: 2}
export function deepCopy(obj, cache = []) {
	// 递归的终止条件
	if(obj === null || typeof obj !== 'object') {
		return obj;
	}

	// if obj is hit, it is in circular structure
	// 避免循环引用
	const hit = find(cache, c => c.original === obj)
	if(hit) {
		return hit.copy;
	}

	const copy = Array.isArray(obj) ? []: {};
	// 把copy 首先放入放置缓存
	// 因为我们想要在递归过程中引用deepCopy
	cache.push({
		original: obj,
		copy,
	})

	Object.keys(obj).forEach(key => {
		copy[key] = deepCopy(obj[key], cache);
	})

	return copy;

}



export function forEachValue(obj, fn) {
	Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function isObject (obj) {
	return obj !== null && typeof obj === 'object'
}

export function isPromise(val) {
	return val && val.then === 'function'
}

export function assert(condition, msg) {
	if(!condition) throw new Error(`[vuex] ${msg}`)
}

// partical 高阶函数 接受函数作为参数并返回函数，返回函数中执行传入的函数和参数
// 偏应用函数，局部应用则是固定一个函数的一个或者多个参数，也就是将一个 n 元函数转换成一个 n - x 元函数：
export function partical(fn, arg) {
	return function () {
		return fn(arg);
	}
}