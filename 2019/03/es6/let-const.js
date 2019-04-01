// 最佳实践
// 开发默认使用let而不是 var,对于需要保护的变量使用const
// 默认使用const, 只有当确实需要改变变量值的时候才使用let

// babel 的实现通过改变量名 实现let
// const 修改值报错以及重复声明报错是在编译时直接报错
// 循环中的let声明, 变成函数作用域
/**
 * var funcs = [];
   for (let i = 0; i < 10; i++) {
	    funcs[i] = function () {
	        console.log(i);
	    };
    }
   funcs[0](); // 0

	var funcs = [];
	var _loop = function _loop(i) {
	    funcs[i] = function () {
	        console.log(i);
	    };
	};

	for (var i = 0; i < 10; i++) {
	    _loop(i);
	}
	funcs[0](); // 0
 */

// var 声明的变量存在变量提升的问题
// 块级作用域存在于函数内部以及 {} 之间的区域
// 块级声明在指定块之外的作用域无法访问的变量
/**
 * let 和 const的特点
 * 1. 不会被提升
 * 2. 重复声明报错
 * 3. 不绑定全局作用域
 * 4. 临时死区
 */

/**
 * 循环中的块级作用域
 * 简单的来说，就是在 for (let i = 0; i < 3; i++) 中，
 * 即圆括号之内建立一个隐藏的作用域，这就可以解释为什么:
 * 然后每次迭代循环时都创建一个新变量，
 * 并以之前迭代中同名变量的值将其初始化。
 *
 * var funcs = [];
	for (let i = 0; i < 3; i++) {
	    funcs[i] = function () {
	        console.log(i);
	    };
	}
	funcs[0](); // 0
	等同于
	(let i = 0) {
		funcs[0] = function() {
			console.log(i)
		}
	}
	(let i = 1) {
		funcs[0] = function() {
			console.log(i)
		}
	}
	(let i = 2) {
		funcs[0] = function() {
			console.log(i)
		}
	}
	
	把let 变成const 会报错，因为在迭代中尝试修改const的值，每次迭代要去修改已有的绑定

	在for in 循环中
	var funcs = [], object = {a: 1, b: 1, c: 1};
	for (var key in object) {
	    funcs.push(function(){
	        console.log(key)
	    });
	}

	funcs[0]()
	结果是'c', 
	改成let ,结果是 'a'
	改成const, 结果是'a'， 为什么不报错
	在for in 循环中，每次迭代不会修改已有的绑定，而是创建一个新的绑定
 *
 *
 * 
 */