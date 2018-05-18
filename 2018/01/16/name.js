// 变量命名的原则要注意 英文词性

// 一般变量用名词
var dog = 'dog'；
var student = {
	name:'小明',
	age:16
}

// boolean 变量/属性 用 形容词，be动词，情态动词，hasXXX
var chinese = {
	hasEye:true,
	canWalk:true,
	isVip:false,
	yellow:true,
}

// 普通函数/方法 用动词开头
var animal = {
	run(){}, //不及物动词
	sleep(){},
	drinkWater(){} //及物动词
}

//回调，钩子函数 用介词，或者动词的完成时态
var person = {
	beforeDie(){},
	afterDie(){},

	willDie(){},
	dead(){}, //这里跟 bool 冲突，你只要不同时暴露 bool dead 和函数 dead 就行
}

btn.onclick = onButtonClick
onButtonClick = () => {};
// vue 命名规范
var component  = {
	beforeCreate(){},
	created(){},
	beforeMount(){},
	mounted(){},
	beforeUpdate(){},
	updated(){},
	activated(){},
	deactivated(){},
	beforeDestory(){},
	destoryed(){},
	errorCaptured(){}
}

// 容易混淆的变量要加上前缀
div1.onclick = () => {}
div2.onclick = () => {}

domDiv1 || elDiv1.onclick = () => {}
$div2.onclick = () => {}

// 属性访问器函数可以用名词
$div.text(); // getText()
$div.text('hi');//setText()

