// 实现new 运算符
// https://github.com/mqyqingfeng/Blog/issues/13
function _new (fn, ...args) {
	const obj = Object.create(fn.prototype)
	const ret = fn.apply(obj, arg)
	return ret instanceof Object ? ret : obj;
}