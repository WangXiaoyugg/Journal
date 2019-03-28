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


_.map = (array, fn) => {
	let results = []
	for(const value of array) 
		results.push(fn(value))
	return results;
}

_.filter = (array, fn) => {
	let results = []
	for(const value of array) {
		(fn(value)) ? results.push(value) : undefined
	}
	return results;
}

// 只支持一层的cancatAll;
// array, [[]]
// 迭代第一次，value [],
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
_.concatAll = (array) => {
	let results = [];
	for(const value of array) {
		results.push.apply(results, value);
	}
	return results;
}

// 支持递归多层的嵌套数组
// [[[123]],[1,2],[1]] => [1,2,3,1,2,1]
_.concatRecursive = (array) => {
	let results = [];
	function concat(arr){
		for(const value of arr) {
			if(Array.isArray(value)) {
				concat(value);
			} else {
				results.push(value);
			}
		}
	}

	return concat(array),results;
}

// 有问题的reduce
_.reduceEasy = (array, fn) => {
	let accumlator = 0;
	for(const value of array) {
		accumlator = fn(accumlator, value)
	}
	return [accumlator];
} 

// 没有问题的reduce
_.reduce = (array, fn, initValue) => {
	let accumlator;
	if(initValue != undefined) {
		accumlator = initValue
	}else {
		accumlator = array[0];
	}
	// 没有初始值从 1开始迭代
	if(initValue === undefined) {
		for(let i = 1; i < array.length; i++) {
			accumlator = fn(accumlator, array[i])
		}
	} else {
		for(const value of array) {
			accumlator = fn(accumlator, value)
		}
	}

	return [accumlator]
}

// zip 支持合并两个给定的数组
_.zip = (leftArr, rightArr, fn) => {
	let index, results = [];
	let leftLen = leftArr.length, rightLen = rightArr.length;
	for(index = 0; index < Math.min(leftLen, rightLen); index++) {
		results.push(fn(leftArr[index], rightArr[index]))
	}
	return results;
}



// 柯里化是把一个多参数函数转换为一个嵌套的一元函数的过程
_.curry1 = (fn) => {
	return function (firstArg) {
		return function(secondArg) {
			return fn (firstArg, secondArg)
		}
	}
}

_.curry2 = (fn) => {
	if(typeof fn !== 'function') {
		throw new Error('No function provided')
	}
	return function (...args) {
		return fn.apply(null, args)
	}
}

_.curry3 = (fn) => {
	if(typeof fn !== 'function') {
		throw new Error('No function provided')
	}
	return function curriedFn(...args) {
		if(args.length < fn.length) {
			return function () {
				var arg = Array.prototype.slice.call(arguments);
				return curriedFn.apply(null, args.concat(arg));
			}
		}

		return fn.apply(null, args);
	}
}

_.partical = function(fn, ...partialArgs) {
	let args = partialArgs;
	return function(...fullArgs) {
		let arg = 0;
		for(let i = 0; i < args.length && arg < fullArgs.length; i++) {
			if(args[i] === undefined) {
				args[i] = fullArgs[arg++]
			} 
		}
		return fn.apply(null, args);
	}
}
module.exports = _;