// 对于简单标量基本类型值，
// 比如 "abc"，如果要访问它的 length 属性或 String.prototype 方法，
// JavaScript 引擎会自动对该值进行封装(即用相应类型的封装对象来包装它)
// 来实 现对这些属性和方法的访问



// join()
function fakeJoin(arr,connector){
	let str = '';
	for(let i=0;i<arr.length;i++){
		if(i>0){
			str += connector
		}
		if(arr[i] !== undefined){
			str += arr[i]
		}
		console.log('str',str);
	}
	return str;
}

var a = new Array(3)
fakeJoin(a,'-');

//创建包含undefined 单元，而非空单元
var a = Array.apply(null,{length:3})
a;//[]

//动态定义正则表达式
var name = 'Kyle'
var namePattern = new RegExp("\\b(?:"+name+")+\\b","ig");
var matches = someText.match(namePattern);

//Date.now() pollfill
if(!Date.now()){
	Data.now = function(){
		return (new Date()).getTime();
	}
}

//错误对象和 throw 结合使用
function foo(x){
	if(!x){
		throw  new Error('x wasn"t provided');
	}
}

//符号并非对象，而是一种简单标量基本类型。

//未赋值的变量，原型是默认值
function isThisCool(vals,fn,rx){
	//使用prototypes 只会被创建一次
	vals = vals || Array.prototype
	fn = fn || Function.prototype
	rx = rx || RegExp.prototype

	return rx.test(
		vals.map(fn).join('')
	)
}

isThisCool();
