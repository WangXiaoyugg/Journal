/**
 * 理解原型和原型链
 */

// 1. 构造函数创建一个对象
// function Person () {
	
// }
// var p = new Person()
// p.name = "Garen";
// console.log(p.name);

// 2. prototype
// Person.prototype.kind = "human"
// var p1 = new Person()
// var p2 = new Person()
// console.log(p1.kind)
// console.log(p2.kind)

// 3. 函数的 prototype 属性指向一个对象，此对象是调用构造函数的而创建的实例
// 	  p1,p2等的原型


// 4. 原型是每一个js对象null之外在创建时就会与之关联另一个对象，每一个对象都会从原型继承属性
//.   Person(构造函数) -> prototype -> Person.prototype

// 5. __proto__, 对象除null外，它指向对象的原型
function Person() {}
var person = new Person();
console.log(person.__proto__ === Person.prototype)
// Person => prototype => Person.prototype
// person.__proto__  -> Person.Prototype 
	
// 6. constructor 每一个原型的都有constructor 属性指向关联的构造函数
function Person() {}
console.log(Person === Person.prototype.constructor)
// Person => prototype => Person.prototype
// Person.prototype.constructor => Person
// person.__proto__ -> Person.prototype

// 7. 实例和原型， 读取实例的属性，如果找不到，就会查找与对象关联的原型中的属性
// 	   如果还找不到，就去找原型上的原型的原型，一直找到最顶层
function Person () {}
Person.prototype.name = 'garen'
var person = new Person()
person.name = "didi"
console.log(person.name)
delete person.name;
console.log(person.name)	

// 8. 原型的原型，原型是一个对象，
var obj = new Object();
obj.name = 'Kevin'
console.log(obj.name) // Kevin
// Person -> prototype -> Person.prototype
// Person.prototype.constructor -> Person
// person.__proto__ -> Person.prototype
// Object -> prototype -> Object.prototype
// Person.prototype.__proto__ -> Object.prototype
// Object.prototype.constructor -> Object

// 9. 原型链，Object.prototype 指向 null;
// 10. constructor 
function Person() {

}
var person = new Person();
// person.constructor === Person.prototype.constructor
console.log(person.constructor === Person); // true
// __proto__
// 其次是 __proto__ ，
// 绝大部分浏览器都支持这个非标准的方法访问原型，
// 然而它并不存在于 Person.prototype 中，
// 实际上，它是来自于 Object.prototype ，与其说是一个属性，
// 不如说是一个 getter/setter，当使用 obj.__proto__ 时，
// 可以理解成返回了 Object.getPrototypeOf(obj)。
// 

// 11. 真的继承吗
// JavaScript 默认并不会复制对象的属性，
// 相反，JavaScript 只是在两个对象之间创建一个关联，
// 这样，一个对象就可以通过委托访问另一个对象的属性和函数，
// 所以与其叫继承，委托的说法反而更准确些。