// bind() 方法会创建一个新函数。
// 当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，
// 之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )
// 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。
// 提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

// https://github.com/mqyqingfeng/Blog/issues/12
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
Function.prototype.bind2 = function (context) {
	if (typeof this !== "function") {
  		throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
	}

	var self = this;
	// 从bind2的第2个参数到最后一个参数
	var args = Array.prototype.slice.call(arguments, 1);

	var fNOP = function () {}

	var fBound = function () {
		var bindArgs = Array.prototype.slice.call(arguments)

		var _this = this instanceof fBound ? this : context;

		return self.apply(_this, args.concat(bindArgs));
	}

	// 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
	// 通过空函数中转
	NOP.prototype = this.prototype;

	fBound.prototype = new fNOP();


	return fBound

	// return function() {
	// 	// console.log('this: ', this)// node环境中窒息的是global, 浏览器环境中指向的是window
	// 	// console.log("self: ", self);
		
	// 	// 把bind 返回后的函数的参数
	// 	var bindArgs = Array.prototype.slice.call(arguments);

	// 	return self.apply(context, args.concat(bindArgs));
	// }
}

// var foo = {
// 	value: 1
// }

// function bar (name, age) {
// 	// console.log(this.value)
// 	// return this.value;
	
// 	console.log(this.value)
// 	console.log(name)
// 	console.log(age);
// }


// var bindFoo = bar.bind2(foo, 'garen');
// bindFoo(18);
// console.log(bar.bind2(foo)());

var value = 2;
var foo = {
	value: 1
}

function bar(name, age) {
	this.habit = 'shopping'
	console.log(this.value)
	console.log(name)
	console.log(age)
}
bar.prototype.friend = 'kevin'

var bindFoo = bar.bind(foo, 'asren')
var obj = new bindFoo('18')

console.log(obj.habit)
console.log(obj.friend)