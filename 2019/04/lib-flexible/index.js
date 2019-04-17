// 可伸缩布局，利用rem
// https://github.com/amfe/article/issues/17
(function flexible(window, document){
	// 获取文档元素
	var docEl = document.documentElement // 返回html根节点
	// 获取dpr 即设备分辨率
	var dpr = window.devicePixelRatio || 1 // 获取不到默认值是1

	// 为什么要单独设置body的 fontSize
	// https://github.com/amfe/lib-flexible/issues/163
	// 起初是为了初始化font-size。Flexbile在不知情的情形下会触发font怪异的渲染现象，的确是一件蛋疼的事情。很多时候没有真实的case，也很难定位。不过现在基本不对Flexbile做相关更新维护。目前开始使用vw来做移动端适配布局。《如何在Vue项目中使用vw实现移动端适配》一文提供了兼容低于Android 4.4 和iOS8.0 的设备。后续会整理一篇有关于Flexbile项目无缝过渡到vw布局的方案。
	function setBodyFontSize () {
		if(document.body) {
			// 谷歌浏览器默认的font-size 12px 
			document.body.style.fontSize = 12 * dpr + "px"
		} else {
			document.addEventListener("DOMContentLoaded", setBodyFontSize)
		}		 
	}
	setBodyFontSize()

	// set 1rem = viewWidth / 10， 设置html文档的rem
	function setRemUnit () {
		var rem = docEl.clientWidth / 10
		docEl.style.fontSize = rem + "px"
	}
	setRemUnit()

	window.addEventListener("resize", setRemUnit)

	// 当一条会话历史记录被执行的时候将会触发页面显示(pageshow)事件。(这包括了后退/前进按钮操作，同时也会在onload 事件触发后初始化页面时触发)
	window.addEventListener("pageshow", function  (e) {
		//presisted 只读属性，表示网页是否是来自缓存.
		if(e.presisted) {
			setRemUnit()
		}
	})

	// 如果dpr 大于2，检测支持0.5px
	if (dpr >= 2) {
		var fakeBody = document.createElement("body")
		var testElement = document.createElement("div")
		testElement.style.border = '.5px solid transparent'
		fakeBody.appendChild(testElement)
		docEl.appendChild(fakeBody)

		// HTMLElement.offsetHeight 是一个只读属性，它返回该元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个整数。
		// 设置0.5px 像素的border支持,元素高度为1,说明支持，类名中添加 .hairlines
		if(testElement.offsetHeight === 1) {
			docEl.classList.add("hairlines")
		}

		// 移除fakeBody
		docEl.removeChild(fakeBody)
	}


})(window, document)
