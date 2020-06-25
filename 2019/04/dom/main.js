 // You don't need jquery
 
 ;(function(window) {
 	// 晚上回去复习
 	window.$ = {
 		isArray: Array.isArray,
 		isWindow: (obj) => obj !== undefined && obj !== null && obj === obj.window
 			// window.window === window， why? https://developer.mozilla.org/zh-CN/docs/Web/API/Window/window		
 		,
 		inArray: (target, array) => {
 			return Array.prototype.includes ? array.includes(target) : array.indexOf(target) > -1;
 			
 		},
 		// 数字不为NaN, 并且是有限的
 		isNumeric: (n) => !isNaN(parseFloat(n)) && isFinite(n),
 		isFunction: (fn) => {
 			if(typeof fn === 'function') return true
 		    let type = Object.prototype.toString.call(fn)
 		    return fn === "[object Function]" || fn === '[object GeneratorFunction]'		
 		},
 		// 返回一个包含所有给定对象自身可枚举属性名称的数组, 没法枚举symbol属性
 		isEmptyObject: (obj) => {
 			let symbolLen = Object.getOwnPropertySymbols(obj).length
 			let propertyLen = Object.getOwnPropertyNames(obj).length
 			return symbolLen + propertyLen === 0;
 		},
 		// 用于测试是否为纯粹的对象 使用 {}, "new Object"创建,
 		isPlainObject: (obj) => {
 			if (typeof obj !== 'object' || 
 				 obj.nodeType ||  
 				 obj !== null && 
 				 obj !== undefined 
 				 && obj === obj.window
 			) {
 				return false;
 			}
 			// 
 			if(obj.constructor && !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
 				return false;
 			}
 			return true;
 		},
 		// 只支持浅比较
 		extend: (target, ...obj) => {
 			return Object.assign({}, target, ...obj)
 		},
 		trim: (str) => str.trim(),
 		map: (arr, fn) => Array.prototype.map.call(arr, fn),
 		each: (arr, fn) => Array.prototype.forEach.call(arr, fn),
 		grep: (arr, fn) => Array.prototype.filter.call(arr, fn),
 		type: (item) => {
 			// 正则匹配要学习
 			// /foo{1,2}$/ 只会匹配 foo, fooo
 			// /(?:foo){1,2}$/ 会匹配 foo, foofoo
 			// 假如第一个参数是 RegExp对象，并且 n 是个小于100的非负整数，那么插入第 n 个括号匹配的字符串。提示：索引是从1开始
 			// const reTypeOf = /(?:^\[object\s(.*?)\]$)/;
		  //   return Object.prototype.toString.call(item)
		  //   	.replace(reTypeOf, '$1')
		  //   	.toLowerCase();
		  	let typeReg = /(?:^\[object\s(.*?)\]$)/;
		  	return Object.prototype.toString.call(item)
		  			.replace(typeReg, '$1')
		  			.toLowerCase()
 		},
 		megre:(...args) => {
 			return Array.from(new Set([].concat(...args)))
 		},
 		now: Date.now(),
 		proxy: (fn, context) => fn.bind(context),
 		// 类数组转换成数组
 		makeArray: (arrayLike) => Array.from(arrayLike),
 		// 检测 DOM 元素是不是其他 DOM 元素的后代.
 		contains: (el, child) => el !== child && el.contains(child),
 		globaleval: (code) => eval(code),
 		parseJSON: (str) => JSON.parse(str),
 		parseHTML: (htmlString) => {
 			// Set the base href for the created document so any parsed elements with URLs
  			// are based on the document's URL
  			// 创建并返回一个 Document对象.
  			// 创建一个上下文
 			const context = document.implementation.createHTMLDocument();
 			const base = context.createElement('base')
 			base.href = document.location.href;
 			context.head.appendChild(base)
 			// 临时上下文的设置为htmlString
 			context.body.innerHTML = htmlString;
 			return context.body.children;
 		} 

 	}

 })(window)

 // Promise
 

 // Animation
//  function show(el) {
//  	el.style.display = ''
//  }
//  function hide(el){
//  	el.style.display = 'none'
//  }
//  function toggle(el) {
//  	// https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle
//  	if(el.ownerDocument.defaultView.getComputedStyle(el, null).display === 'none') {
//  		el.style.display = ''
//  	} else {
//  		el.style.display = 'none'
//  	}
//  }
 
//  function hide1 (e) {
// 	// console.log(e) 
// 	this.style.display = 'none'
//  }

// // 让监听只复发一次也可以，或者每次fadeIn之前removeEventListener
//  function fadeOut(el, ms) {
//  	// console.log("fadeOut")
 	
//  	if(ms) {
//  		el.style.transition = `opacity ${ms}ms`
//  		el.addEventListener("transitionend",hide1 )
//  	}
//  	el.style.opacity = 0
//  }

// function fadeIn(el, ms) {
//  	el.removeEventListener("transitionend", hide1)
//  	console.log("fadeIn")
//  	el.style.opacity = 0;
//  	if(ms) {
//  		let opacity = 0;
//  		let timer = setInterval(() => {
//  			opacity += 50 / ms;
//  			if (opacity >= 1) {
//  				clearTimeout(timer)
//  				opacity = 1
//  				el.style.display = 'block'
//  				console.log("1",el.style.display)
//  			}
//  			el.style.opacity = opacity
//  			el.style.display = 'block'
//  			console.log("2", el.style.display)
//  		}, 50)	
//  	} else {
//  		el.style.opacity = 1
//  		el.style.display = 'block' 	
//  	} 	
// }

// function fadeTo(el, s, opacity) {
// 	el.style.transition = `opactiy ${s}s`
// 	el.style.opacity = opacity
// }

// function fadeToggle(el, s) {
// 	el.style.transition = `opacity ${s}s`
// 	let opacity = el.ownerDocument.defaultView.getComputedStyle(el, null).opacity;
// 	console.log(opacity, typeof opacity)
// 	if(opacity === '1') {
// 		el.style.opacity = '0' // 留在文档流中
// 	} else {
// 		el.style.opacity = '1'
// 	}
// }

// function slideUp(el) {
// 	el.style.transition = 'height 3s';
// 	el.style.height = '0px'
// }
// function slideDown(el, height) {
// 	el.style.transition = 'height 3s';
// 	el.style.height = height + 'px';
// }

// const el = document.getElementById('demo');
// let orginHeight = el.ownerDocument.defaultView.getComputedStyle(el, null).height
// el.style.transition = 'height 2s'

// function slideToggle(el) {
// 	let height = el.ownerDocument.defaultView.getComputedStyle(el, null).height
// 	console.log("height:", height)
// 	if(parseInt(height, 10) === 0) {
// 		console.log('down')
// 		console.log("orginHeight: ", orginHeight)
// 		el.style.height = orginHeight;
// 		console.log("el.style.height: ",el.style.height)
// 	} else {
// 		console.log("up")
// 		el.style.height = '0px'
// 	}
// }

// function Animate(el,params, speed) {
// 	el.style.transition = "all " + speed +'ms';
// 	Object.keys(params).forEach(key => {
// 		el.style[key] = params[key]
// 	})
// }
// setTimeout(() => {
// 	Animate(el, {background: 'green', height: '200px',}, 2000)
// }, 1000)

 // setTimeout(() => {
 // 	// slideUp(el)
 // 	// slideToggle(el)
 // 	setTimeout(() => {
 // 		// slideToggle(el)
 // 		// slideDown(el, 100)
 // 	}, 4000)
 // }, 1000)
 // slideUp(el)
 // slideDown(el, 1000)
 // fadeTo(el, 3, 0.2);
 // fadeToggle(el, 3);
 // hide(el);
 // toggle(el)
 // setTimeout(() => {
	//  fadeOut(el, 500)
	//   setTimeout(() => {
 // 	// show(el)
 // 	// toggle(el)
	//  	fadeIn(el, 2000)
	//  }, 1500)
 // }, 1000)


 // show/hide Toggle, FadeIn, FadeOut, FadeTo, FadeToggle, 
 // SlideUp,SlideDown, SlideToggle, Animate
 
 // Ajax
 // fetch
 
 // Events
 // DOMContentLoaded
 // addEventListener
 // removeEventListener
 // Trigger
 
 // DOM
 // remove
 // getText, setText
 // getHTML, setHTML
 // append, prepend, insertBefore, insertAfter
 // is
 // clone
 // empty
 // wrapper
 // unwrap
 // replaceWith
 // simple parse
 
 // DOM query
 //  selector
 //  class
 //  id
 //  attr
 //  child
 //  slibing
 //  cloest
 //  Parents
 //  Form
 //  iframe Contents
 //  body
 //  attrs
 
 // CSS & Style
 // CSS, getStyle, setStyle, addClass, removeClass,hasClass, ToggleClass
 // Width & Height
 // Position & Offset
 // ScrollTop
 //    