/**
 * 成员是唯一的额，没有重复的值
 * 1. 初始化
 * 2. 属性和方法
 	方法
 * 	  add(value)
 * 	  delete(value)
 * 	  has(value)
 * 	  clear();
 * 	  遍历方法
 * 	  keys()
 * 	  values()
 * 	  entries()
 * 	  forEach()
 * 	属性
 * 	  Set.prototype.constructor
 * 	  Set.prototype.size	  
 * 	  	
 */

let s = new Set();
let s1 = new Set([1,3,3,2,4]);
let s2 = new Set(s1);
console.log(s1.size);

let s3 = new Set()
s3.add(1).add(2);
s3.delete(2)
s3.has(2);
s3.clear();
s3.has(1)

let s4 = new Set(['a','b', 'c']);
s4.keys();
[...s4.keys()];
s4.values();
[...s4.values()];
s4.entries();
[...s4.entries()];
s4.forEach((value, key) => console.log(key + " : " + value));

// 第一版的Set
(function(global){
	var NaNSymbol = Symbol("NaN")

	var encodeVal = function  (value) {
		return value !== value ? NaNSymbol: value;
	}
	var decodeVal = function  (value) {
		return value === NaNSymbol ? NaN : value;
	}

	// 难点在于实现迭代器接口
	var makeIterator = 	function(array, iterator) {
		var nextIdx = 0;
		// new Set(new Set()) 会在这里调用
		var obj = {
			next: function () {
				return nextIdx < array.length 
					? {value: iterator(array[nextIdx++]), done: false}
					: {value: void 0, done: true}
			}
		}

		obj[Symbol.iterator] = function () {
			return obj
		}

		return obj;
	}	


	// forOf接口
	function forOf (obj, cb) {
		let iterable, result;
		if(typeof obj[Symbol.iterator] !== "function") throw new TypeError(obj + " is not iterable");
		if(typeof cb !== 'function') throw new TypeError('cb must be callable');

		iterable = obj[Symbol.iterator]();

		result = iterator.next()
		while(!result.done) {
			cb(result.value)
			result = iterable.next()
		}
	}

	function MySet(data) {
		this._values = [];
		this.size = 0;

		data && data.forEach(function(item) {
			this.add(item)
		}, this);
	}

	MySet.prototype.add = function (value) {
		// 处理NaN 重复的问题
		value = encodeVal(value);
		if(this._values.indexOf(value) == -1) {
			this._values.push(value)
			this.size++;
		} 
		return this;
	}
	MySet.prototype.has = function (value) {
		value = encodeVal(value);
		return this.values.indexOf(value) !== -1; 
	}

	MySet.prototype.delete = function  (value) {
		value = encodeVal(value);
		var idx = this._values.indexOf(value)
		if(idx === -1) return false;
		this._values.splice(idx, 1);
		--this.size;
		return true;
	}

	MySet.prototype.clear = function  (value) {
		this._values = []
		this.size = 0;
	}

	MySet.prototype.forEach = function  (cb, thisArg) {
		thisArg = thisArg || global;
		var iterator = this.entries();
		forOf(iterator, (item) => {
			cb.call(thisArg, item[1], item[0], this);
		})
	}

	MySet.prototype.values = MySet.prototype.keys = function  () {
		return makeIterator(this._values, function  (value) {
			return decodeVal(value)
		})
	}

	MySet.prototype.entries = function  () {
		return makeIterator(this._values, function  (value) {
			return [decodeVal(value), decodeVal(value)]
		})
	}

	MySet.prototype[Symbol.iterator] = function  () {
		return this.values()
	}




	MySet.length = 0;
	global.MySet = MySet;

})(this)
