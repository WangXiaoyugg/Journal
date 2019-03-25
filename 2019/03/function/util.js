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


module.exports = _;