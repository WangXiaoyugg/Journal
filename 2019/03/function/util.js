/*
 * 函数式编程入门的代码
 */

const _ = {}

_.forEach = (array, fn) => {
	for(let i = 0; i < array.length; i++) {
		fn(array[i], i, array)
	}
}
_.forEachObj =(obj, fn) => {
	for(let key in obj) {
		if(obj.hasOwnProperty(key)) {
			fn(key, obj[key], obj)
		}
	}
}
_.unless = (predicate, fn) => {
	if(!predicate) {
		fn();
	}
}

_.times = (times, fn) => {
	for(let i = 0; i < times; i++) {
		fn(i);
	}
}

_.every = (array, fn) => {
	let result = true;
	for(let i = 0; i < array.length; i++) {
		result = result && fn(array[i])
		if(!result) break;
	}
	return result;
}

_.some = (array, fn) => {
	let result = false;
	for(let i = 0; i < array.length; i++) {
		result = result || fn(array[i]);
		if(result) break;
	}
	return result;
}

_.sortBy = (property) => {
	return (a,b) => {
		let result = (a[property] < b[property]) ? -1 :
		(a[property] > b[property]) ? 1:0;
		return result;
	}
}

// 接受一个value,并返回一个包含value的闭包函数
_.tap = (value) => fn => (typeof fn === 'function' && fn(value), console.log(value));

// 接受多参数函数，并返回只接受一个参数的函数
_.unary = fn => fn.length === 1 ? fn : (arg) => fn(arg)

_.once = fn => {
	let done = false;
	return () => {
		return done ? undefined : ((done=true), fn.apply(this, arguments));
	}
}

_.memoized = fn => {
	const dict = {}
	return (arg) => {
		return dict[arg] || (dict[arg] = fn(arg))
	};
}


module.exports = _;