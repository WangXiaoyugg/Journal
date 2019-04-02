/**
 * WeakMap 只接受对象作为键名
 *
 * 
 */

// 1. 只接受对象作为键名
const m1 = new WeakMap()
// m1.set(1)
// m1.set(null, 2)

// 2. weakMap的键名所引用的对象是弱引用，保持了对键名对象引用的对象是弱引用
// 在计算机中，一个对象只被弱引用所引用，则被认为是不可访问，并且能在任何时候回收
// var obj = new Object();
// obj = null; //才有可能回收obj所引用的对象

// 引用才能被回收
let map = new Map();
let key = new Array(5 * 1024 * 1024);
map.set(key, 1);
map.delete(key);
key = null;

// 引用自动回收
const wm = new WeakMap();
let key = new Array(5 * 1024 * 1024);
wm.set(key, 1);
key = null;

// 所以 WeakMap 可以帮你省掉手动删除对象关联数据的步骤，
// 所以当你不能或者不想控制关联数据的生命周期时就可以考虑使用 WeakMap
// 总结这个弱引用的特性，就是 WeakMaps 保持了对键名所引用的对象的弱引用，
// 即垃圾回收机制不将该引用考虑在内
// WeakMap 不可遍历，没有siz属性，也不支持clear方法
// WeakMap 只支持get() set() has() delete()


// 应用
// 1. 在DOM 对象上保存相关数据
let wm = new WeakMap();
let el = document.querySelector(".item")
wm.set(el, "data")
let value = wm.get(el)
console.log(value) // data;
el.parentNode.removeChild(el);
el = null;

// 2. 数据缓存
// 不修改原有对象的情况下储存某些属性或者根据对象储存一些计算的值等
// 不想管理这些数据的死活时非常适合考虑使用 WeakMap
const cache = new WeakMap()
function countOwnKeys (obj) {
	if(cache.has(obj)){
		return cache.get(obj)
	} else {
		const count = Object.keys(obj).length;
		cache.set(obj, count)
		return count;
	}
}

// 3. 私有属性
// WeakMap 也可以被用于实现私有变量，不过在 ES6 中实现私有变量的方式有很多种，
const privateData = new WeakMap();
class Person {
	constructor(name, age) {
		privateData.set(this, {name, age})
	}
	getName() {
		return privateData.get(this).name
	}
	getAge() {
		return privateData.get(this).age;
	}	

}
// export default Person
