/**
 * Symbol 原始数据类型，表示独一无二的值
 * 1. Symbol 通过Symbol 函数生成， typeof 类型为 symbol
 * 2. Symbol 函数不能使用new命令，否则会报错，它是原始类型值不是对象
 * 3. instanceof 的结果是为false
 * 4. Symbol 函数可以接受一个字符串为参数，表示对Symbol实例的描述
 * 5. 如果Symbol的参数是一个对象，就会调用对象的toString方法，将其转化为字符串，生成Symbol
 * 6. Symbol 函数参数只是表示对当前Symbol值的描述，相同参数的Symbol函数返回值是不相等的
 * 7. Symbol 值不能与其他类型值进行运算，否则报错
 * 8. Symbol 可以转换成字符串，就是Symbol的描述
 * 9. Symbol 可以作为标识符，用于对象的属性名称，可以保证不会出现同名的属性
 * 10. Symbol 作为属性名称，改属性不会出现在for...in, for...of 循环中，不会被
 * 	   Object.keys() Object.getOwnPropertyNames() JSON.stringify()返回
 * 	   但也不是私有属性，可以通过 Object.getOwnPropertySymbols获取所有Symbol属性
 * 11. 使用同一个Symbol 值，通过Symbol.for
 * 12. Symbol.keyFor 返回一个已登记的Symbol类型的key	
 *
 * 规范中 Symbol 执行
 * 1. 使用new 报错
 * 2. 如果description是undefined, descString 为undefined
 * 3. 否则让descString 为ToString(description)
 * 4. 如果报错，就返回
 * 5. 返回一个新的唯一的Symbol值，它的内部属性是descString
 *
 * 使用场景
 * 1. 当我们只需要知道每个变量的值都是百分百不同的即可，这时候我们就可以用Symbol
 */

// var s = Symbol()
// console.log(typeof s);

// var s1 = Symbol("foo")
// console.log(s instanceof Symbol)

// var s2 = Symbol("foo")
// console.log(s2)

// var o = {
// 	toString() {
// 		return "abc"
// 	}
// }
// var s3 = Symbol(o)
// console.log(s3)

// var s4 = Symbol()
// var s5 = Symbol()
// s4 === s5;
// var s6 = Symbol('foo')
// var s7 = Symbol("bar")
// s6 === s7

// var s8 = Symbol.for("foo");
// console.log(Symbol.keyFor(s8));

// var s9 = Symbol.for('foo');
// var s10 = Symbol.for('foo');
// s9 === s10

console.log(s1 === s2); // true

(function () {
	var root = this;

	var generateName = (function(){
		var postfix = 0;
		return function(descString) {
			postfix++;
			return '@@' + descString + '_' + postfix;
		}
	})()

	var SymbolPolyfill = function Symbol(description) {
		if(this instanceof SymbolPolyfill)
			throw new TypeError("Symbol is not a constructor")

		var descString = description === undefined ? undefined: String(description);

		var symbol = Object.create({
			toString: function() {
				return this.__Name__
			},
			valueOf: function() {
				// throw new Error("Cannot convert a Symbol value")
				return this;
			}
		})

		// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
		Object.defineProperties(symbol, {
			"__Description__": {
				value: descString,
				writeable: false,
				enumerable: false,
				configurable: false,
			},
			"__Name__": {
				value: generateName(descString),
				writeable: false,
				enumerable: false,
				configurable: false,
			}
		})

		return symbol;
	}

	var forMap = {}
	Object.defineProperties(SymbolPolyfill, {
		'for': {
			value: function(description) {
				var descString = description === undefined ? undefined:String(description);
				return forMap[descString] ? forMap[descString]: forMap[descString] = SymbolPolyfill(descString)

			},
			writable: true,
            enumerable: false,
            configurable: true,
		},
		'keyFor': {
			value: function(symbol) {
				for(var key in forMap) {
					if(forMap[key] === symbol) return key;
				}
			},
			writable: true,
            enumerable: false,
            configurable: true,
		}
	})

	root.SymbolPolyfill = SymbolPolyfill;
})()

