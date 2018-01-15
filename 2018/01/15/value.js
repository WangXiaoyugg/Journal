/*
* 1. 数组可以是任意类型的值
* 2. 字符串和数组类似，特征不同，都是不变的
* 3. 数字包括 整数 和浮点型
* 4. null 表示一个值null
* 5. undefined 表示一个值 undefined
* 6. 变量在为赋值之前都是 undefined
* 7. void 返回 undefined
* 8. 数字有几个特殊值，NaN, +Infinity,-Infinity , -0
* 9. 简单标量基本类型(字符串，数字等)通过值复制来赋值和传递
* 10. 而复合值(对象)是通过引用来复制来赋值传递
* 11. javscript中的引用只能指向值
*/





// 稀疏数组，含有空白和空缺单元的数组
var a = [];
a[0] = 1
a[2] = [3]
a[1]; // undefined

a.length; // 3

// 数组也是对象，可以包含字符串键值和属性
var a = [];
a[0] = 1
a['foobar'] =2;
a.length ;//1
a['foobar'];// 2
a.foobar //2

//字符串键值能被强制转换为10进制数字，会被当作数字索引
var a = [];
a['13'] = 42;
a.length;//14

//类数组
function foo(){
	var arr = Array.prototype.slice.call(arguments);
	//等同于
	// var arr = Array.from(arguments);
	
	arr.push('baba');
	console.log(arr)
}

foo('bar','baz');//['bar','baz','baba']

//字符串是不变的，字符数组是可变的
var a = 'foo';
var c = Array.prototype.join.call(a,'-');
var d = Array.prototype.map.call(a,function(v){
	return v.toUpperCase() + '.';
}).join('');

//字符串反转
var a = 'foo';
var c = a.split('').reverse().join('');//oof

//机器精读 2^-52 
if(!Number.EPSILON){
	Number.EPSILON = Math.pow(2,-52);
}

function numbersCloseEnoughEqual(n1,n2){
	return Math.abs(n1-n2) < Numer.EPSILON;
}
numbersCloseEnoughToEqual( 0.1+0.2,0.3 );

//检查是否是整数

if(!Number.isInteger){
	Numer.isInteger = function(num){
		return typeof num == 'number' && num % 1 == 0;
	}
}

//检查 是否是一个安全的整数
if(!Number.isSafeInteger){
	Number.isSafeInteger = function(num){
		return Number.isInteger(num) &&
				Math.abs(num) <= Number.MAX_SAFE_INTEGER;//Number.MAX_SAFE_INTEGER = 2^53 - 1
	}
}

// 永远不要重新定义undefined
// void 没有返回值
var a = 42
console.log(void a, a);// undefined 42

// void 作用就是 不让表达式返回任何结果
function doSomething(){

	if(!APP.ready){
		return void setTimeout(doSomething,1000);
	}
	//等同于
	if (!APP.ready){
		setTimeout(doSomething,1000);
		return;
	}

	var result;
	return result;
}

if(doSomething()){

}

//检查 是否是 NaN
if(!Number.isNaN){
	Number.isNaN = function(n){
		return (
			typeof n === 'number' && window.isNaN(n)
		)
	}
}
//NaN 不等于自身
if(!Number.isNaN){
	Number.isNaN = function(n){
		return  n != n;
	}
}

// 区分 -0 和 0
function isNegZero(n){
	n = Number(n);
	return (n === 0) && ( 1/n === -Infinity);
}

//Object.is 判断是否绝对相等
if(!Object.is){
	Object.is = function(v1,v2){
		//判断是否是 -0
		if( v1 === 0 && v2 === 0){
			return 1 / v1 === 1/v2;
		}

		if(v1 !== v1){
			return v2 !== v2;
		}

		return v === v2
	}
}

function foo(x){
	x.push(4);
	x;//[1,2,3,4]

	x.length = 0;
	x.push(4,5,6,7)
	x;//[4,5,6,7]

}
var a = [1,2,3]
foo(a);
a ;//[4,5,6,7] 不是 【1，2，3，4]

//我们无法自行决定使用值复制还是引用复制，一切由值的类型来决定

var obj = {
	a:2
}

function foo(wrapper){
	wrapper.a = 42;
}

foo(obj);

obj.a //42;

function foo(x){
	x = x+1;
	x;//3
}

var a = 2;
var b = new Number(a);//2
foo(b)
console.log(b);//2 不是 3