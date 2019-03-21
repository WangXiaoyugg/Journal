
function imageToCanvas (image, cb) {
	var canvas = image;

	// 图片是一个 HTMLImage 元素的实例 https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement
	if(image instanceof HTMLImageElement) {

		// 图片已经成功加载，有宽和高
		if(image.width && image.height && image.complete) {
			canvas = getCanvasFromImage(image);
			process.nextTick(cb(undefined, canvas))
		} else {
			// 没有加载，在onload回调里处理
			image.onload = function() {
				canvas = getCanvasFromImage(image)
				cb(null, canvas)
			}
			// 加载失败，回调错误提示用户
			image.onerror = function () {
				cb(new Error("Image load failed"))
			}
		}
	
	// 如果图片已经是canvas元素，直接赋值，回调给用户
	} else if (image instanceof HTMLCanvasElement) {

		canvas = image;
		process.nextTick(cb.bind(undefined, null, canvas))

	}


	else {
		 // 不是直接报错提示用户		
		let errorMsg = "Cannot convert: " + Object.prototype.toString.call(image) + " to an HTMLCanvasElement"
		// https://nodejs.org/api/process.html#process_process_nexttick_callback_args
		process.nextTick(
			// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error
			cb.bind(undefined, new Erorr(errorMsg, canvas))
		)
	}	
}

// 核心逻辑把图片转化成canvas，调用api
// 但是没有考虑不同手机的DPR, 以及异常处理
// 打包的时候是通过module.export 暴露出去，但是代码是在浏览器上跑，有问题

function getCanvasFromImage(image) {
	// https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
	var canvas = document.createElement('canvas')
	var context = canvas.getContext('2d')

	canvas.width = image.width;
	canvas.height = image.height;
	context.drawImage(image, 0, 0)
	return canvas
}

if(typeof module !== 'undefined' && module.exports) {
	imageToCanvas.default = imageToCanvas
	module.exports = imageToCanvas

} else if (typeof define === 'function' &&  define.amd && define.amd === 'object') {
	define('imageToCanvas', [], function () {
		return imageToCanvas
	})
} else {
	window.imageToCanvas = imageToCanvas;
}
