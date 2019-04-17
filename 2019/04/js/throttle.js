/**
 * 节流， 每隔一段时间，只执行一次事件
 * 我们用 leading 代表首次是否执行，trailing 代表结束后是否再执行一次。
 * 关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。
 */

var app = document.getElementById("app");
var count = 1;

function getUserMove() {
	app.innerHTML = count++;
}

// 1. 使用时间戳
// function throttle(func, wait) {
// 	var context, args;
// 	var previous = 0;
// 	return function () {
// 		var now = +new Date()
// 		context = this;
// 		args = arguments;
// 		if(now - previous > wait) {
// 			func.apply(context, args)
// 			previous = now;
// 		}
// 	}
// }


// 2.使用定时器
function throttle(func, wait) {
	var timeout;
	var previous = 0;

	return function () {
		context = this;
		args = arguments;
		if(!timeout) {
			timeout = setTimeout(function() {
				timeout = null;
				func.apply(context, args);
			}, wait)
		}
	}
}

app.onmousemove = throttle(getUserMove, 3000);

// 3. 比较两种，
// 时间戳会立刻执行，定时器会在n秒后第一次执行
// 时间戳事件停止后没有办法再执行事件， 第二种事件停止触发后依然会再执行一次事件


// 4. 鼠标移入就能立刻执行，停止触发的时候还能再执行一次
function throttle(func, wait) {
	var timeout, context, args, result;
	var previous = 0;

	var later = function() {
		previous = +new Date()
		timeout = null;
		func.apply(context, args)
	}
	var throttled = function () {
		var now = +new Date()
		 //下次触发 func 剩余的时间
		var remaining = wait - (now - previous)
		context = this;
		args = arguments;
		if(remaining <= 0 || remaining > wait) {
			if(timeout) {
				clearTimeout(timeout)
				timeout = null;
			}
			previous = now;
			func.apply(context, args);
		} else if (!timeout) {
			timeout = setTimeout(later, remaining)
		}


	}

	return throttled
}
	
function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };

    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    };

    return throttled;
}

