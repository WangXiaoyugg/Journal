/**
 * for-of的减少复杂度和减少嵌套循环中的错误
 * 迭代器，具有next 方法的对象，每次调用next都会返回一个结果对象，
 * 结果对象有两个属性，value表示当前值，done表示遍历是否结束
 * for-of 对对象进行遍历
 * 其实一种数据结构只要部署了 Iterator 接口，
 * 我们就称这种数据结构是“可遍历的”（iterable）
 * ES6 规定，默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性
 * 数组，Set, Map, 类数组对象，Generator, 字符串默认具备iterator属性
 *
 * 内建迭代器
 * entries 返回遍历器对象，
 * keys 返回一个遍历器对象的key
 * values 返回一个遍历器对象的value
 * 注意：Set keys, values 返回都是相同的迭代器
 * 注意: 数组和Set集合默认迭代器是 values（）
 * 		Map默认迭代亲是 entries()
 *
 * Babel 如何编译for of
 */

function unique(array){
	var res = []
	for(var i = 0, len = array.length; i < len; i++) {
		for(var j = 0, resLen = res.length; j < resLen; j++) {
			if(array[i] == res[j]) {
				break;
			}
		}
		if(j == resLen) {
			res.push(array[i])
		}
	}
	return res;
}

function createIterator(items) {
	var i = 0;
	return {
		next: function(){
			var done = i >= items.length;
			var value = !done ? items[i++]: undefined
			return {
				done: done,
				value: value,
			}
		},
		return: function() {
			console.log("执行 return 方法")
			return {
				value: 23333,
				done: true,
			}
		}
	}
}

var iterator = createIterator([1,2,3])
iterator.next();
iterator.next();
iterator.next();
iterator.next();

// 模拟实现forOf
function forOf(obj, cb) {
	let iterable, result;
	if(typeof obj[Symbol.iterator] !== 'function') {
		throw new TypeError(result + " is not iterable")
	}

	if(typeof cb !== 'function') {
		throw new TypeError("cb must be callable")
	}

	iterable = obj[Symbol.iterator]()
	result = iterable.next()

	while(!result.done) {
		cb(result.value)
		result = iterable.next()
	}
}
