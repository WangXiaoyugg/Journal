
/**
 * 防抖是为了解决事件的频繁触发，比如resize,scroll, mousedown, mousemove, keyup, keydown
 */
var count = 1;
var app = document.querySelector('#app')

function getUserMove (e) {
	console.log("this: ", this);
	console.log("e: ", e);
	app.innerHTML = count++;
	return "Hello";
}

// 1. 没有debounce.js
// app.addEventListener("mousemove", getUserMove, false)

// 2. 防抖的原理就是一段时间我只触发一次，如果在这段时间内又触发了，取消之前的时间，以新的事件为准
// function debounce(fn, wait) {
// 	var timeout;
// 	return function () {
// 		timeout && clearTimeout(timeout)
// 		timeout = setTimeout(fn, wait);
// 	}
// }

// app.addEventListener("mousemove", debounce(getUserMove, 1000), false)

// 2. debounce this的指向不对，没有指向调用的dom本身，而是指向了window对象
// function debounce(fn, wait) {
// 	var timeout;
// 	return function () {
// 		var context = this;
// 		timeout && clearTimeout(timeout)
// 		timeout = setTimeout(function() {
// 			fn.apply(context);
// 		},  wait);
// 	}
// }
// app.addEventListener("mousemove", debounce(getUserMove, 1000), false)

//3. debounce 没有传递event对象，
// function debounce(fn, wait) {
// 	var timeout;
// 	return function () {
// 		var context = this;
// 		var args = arguments;
// 		timeout && clearTimeout(timeout)
// 		timeout = setTimeout(function() {
// 			fn.apply(context,args);
// 		},  wait);
// 	}
// }
// app.addEventListener("mousemove", debounce(getUserMove, 1000), false)

// 4. 立即执行, 立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行
// function debounce(func, wait, immediate) {
// 	var timeout;
// 	return function () {
// 		var context = this;
// 		var args = arguments;

// 		if(timeout) clearTimeout(timeout)
// 		if(immediate) {
// 			var callNow = !timeout;
// 			timeout = setTimeout(function(){
// 				timeout = null;
// 			}, wait)
// 			if(callNow) func.apply(context, args);
// 		} else {
// 			timeout = setTimeout(function(){
// 				func.apply(context, args);
// 			}, wait)
// 		}
// 	}
// }
// app.addEventListener("mousemove", debounce(getUserMove, 1000, false),false)

// 5. 返回值，现在getUserMove 没有返回值
// function debounce(func, wait, immediate) {
// 	var timeout;
// 	var result;
// 	return function () {
// 		var context = this;
// 		var args = arguments;

// 		if(timeout) clearTimeout(timeout)
// 		if(immediate) {
// 			var callNow = !timeout;
// 			timeout = setTimeout(function(){
// 				timeout = null;
// 			}, wait)
// 			if(callNow) result = func.apply(context, args);
// 		} else {
// 			timeout = setTimeout(function(){
// 				result = func.apply(context, args);
// 			}, wait)
// 		}

// 		console.log("result ", result);

// 		return result;
// 	}
// }
// app.addEventListener("mousemove", debounce(getUserMove, 1000, true),false)

// 6. 支持取消，取消防抖，再去触发又立刻执行函数
function debounce(func, wait, immediate) {
	var timeout, result;

	var debounced = function() {
		var context = this;
		var args = arguments;
		if(timeout) clearTimeout(timeout)
		if(immediate) {
			var callNow = !timeout;
			timeout = setTimeout(function() {
				timeout = null;
			},wait);
			if(callNow) result = func.apply(context, args);
		} else {
			timeout = setTimeout(function() {
				func.apply(context, args)
			},wait)
		}
		return result	 
	}

	debounced.cancel = function() {
		timeout && clearTimeout(timeout)
		timeout = null;
	}

	return debounced
}

var setUserMove = debounce(getUserMove, 1000, true);
app.addEventListener("mousemove", setUserMove);

document.getElementById('btn').addEventListener('click', function(){
	setUserMove.cancel();
})
