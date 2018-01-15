
/*
* 1. 其中内置类型 null,undefined,boolean ,number,string,object,symbol
* 2. typeof 可以查看值的类型
* 3. 变量没有类型区别，他们持有的值有类型区别
* 4. undefined 不等同于 undeclare
* 5. typeof 的安全防范机制防止报错
*/




// 检测 null
function is Null(val){
	return (!null && typeof val === 'object')
}

//变量是没有类型的，值是有类型的

//typeof 安全防范机制
if(DEBUG){
	console.log('Debugging is starting')//报错
}

if(typeof DEBUG !== 'undefined'){
	console.log('Debugging is starting')
}

//用于 polyfill
if (typeof atob === 'undefined'){
	atob = function(){}
}

//检查全局变量是否是全局对象window的属性
if (window.DEBUG) {

}

if (!window.atob){

}

//检查你的变量是否在宿主程序中的定义过
function doSomethingCool(){
	var helper = (typeof FeatureXYZ !== 'undefined') ?
				FeatureXYZ : function(){}

	var val = helper();				
}
 
(function(){
	function FeatureXYZ(){};

	function doSomethingCool(){
		var helper = (typeof FeatureXYZ !=='undefined') ?
				FeatureXYZ : function(){};

		var val = helper();		
	}

	doSomethingCool();
})()     

//依赖注入,函数传参
function doSomethingCool(FeatureXYZ){
	var helper = FeatureXYZ || function(){};

	var val = helper();
}