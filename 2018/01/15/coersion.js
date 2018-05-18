var a = [1,2,3]
a.toString(); //1,2,3

//toJSON 非法 JSON值的对象做字符串化
//返回一个能够被字符串化的安全的 JSON 值
var o = {}
var a = {
	b:42,
	c:o,
	d:function () {}
}

o.e = a;
JSON.stringify(a);//报错，循环引用

a.toJSON = function(){
	return {b:this.b}
}

JSON.stringify(a);

var a = {
	val : [1,2,3]
	toJSON:function(){
		return this.val.slice(1)
	}
}

var b = {
	val: [1,2,3]
	//可能不是我们想要结果
	toJSON:function(){
		return "[" + this.val.slice(1).join()+"]"
	}
}

var a = {
	b:42,
	c:"42",
	d:[1,2,3]
}

JSON.stringify(a,["b","c"]) //"{"b":42,"c":"42"}"

JSON.stringify(a,function(k,v){
	if( k !== 'c') return v;

})//"{"b":42,"d":[1,2,3]}"

JSON.stringify(a, null, 3)

//强制转换 undefined,null,false, +0,-0,NaN ,"",''都是 falsy 值
//document.all 假值处理

//日期转换为时间戳
var timestamp = + new Date;
var timestamp = Date.now();

//~  当 x = -1 ,为 0，隐藏细节；
//～ 比 >= 0 和 == -1 更简洁;
var a = 'hello world';
~a.indexOf('lo'); -4 真值；

if(~a.indexOf('lo')){
	//true
}
~a.indexOf('ol')// 0;
!~a.indexOf('ol')//true;

if(!~a.indexOf('ol')){
	// 没找到的匹配
}

//字位截除
~~ 49.6//-49

//建议使用 Boolean(a) 和 !!a 进行强制类型转换

{} + [] //0
[] + {}//"[object,object]"

//




