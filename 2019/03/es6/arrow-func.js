/**
 * 	箭头函数和 普通函数比较
 * 	1. 没有this, 需要通过查找作用域连确定this的值，向外层查找最近的this值
 * 	   没有this, 不能用call, apply, bind 这些方法改变this的值	
 * 	2. 没有自己的arguments对象，但可以访问外围函数的arguments对象
 * 	   箭头的函数的参数可以通过命名参数或者 rest参数的形式访问
 * 	3. 不能通过new关键字调用, 不能当作构造函数
 * 	4. 没有new.target， super
 * 	5. 没有原型 
 *
 *	适用场景
 *	适合no-methods的函数
 *	自执行函数
 *   
 */
// 箭头函数的基本用法
let fn1 = value => value;
// 等同于
let fn2 = function (value) {
	return value
}

let fn3 = (value, num) => value * num;
let fn4 = function (value, num) {
	return value * num
}

let fn5 = (value, num) => ({total: num * value})
let fn6 = function (value, num) {
	return {
		total: num * value
	}
}

let fn7 = ({value, num}) => ({total: num * value})
let fn8 = function ({value, num}) {
	return {
		total: num * value
	}
}

// 以下在 React 中的使用场景结合 Immutable
/**
 * handleEvent = () => {
 * 	this.setState({
 * 		data: this.state.data.set("key", "value")
 * 	})
 * }
 * 简化为
 * handleEvent = () => {
 * 	this.setState(({data}) => ({
 * 		data: data.set("key", "value")
 * 	}))
 * }
 */

// 点击按钮改变按钮的颜色
// this 指向 当前点击到元素，而不是 Button的实例
function Button(id) {
    this.element = document.querySelector("#" + id);
    this.bindEvent();
}

Button.prototype.bindEvent = function() {
    this.element.addEventListener("click", this.setBgColor, false);
};

Button.prototype.setBgColor = function() {
    this.element.style.backgroundColor = '#1abc9c'
};

var button = new Button("button");
// 解决方法
// 1. this.setBgColor.bind(this)
// 2.  event => this.setColor(event)

// 自执行函数
(() => {
	console.log(1)
})()

