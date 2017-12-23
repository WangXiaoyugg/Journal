//setTimout 模拟 setInterval

// setTimeout(function(){

	// setTimeout(arguments.callee,interval);
// })

setTimeout(function(){
	console.log(1)
	setTimeout(arguments.callee,50)
})

//数组分块

var array = [1,2,3,4,5,6]
setTimeout(function(){
	var item = array.shift();
	process(item)

	if(array.length > 0){
		setTimeout(arguments.callee,100)
	}

},100)

function process(item){
	console.log(item)
}

function chunk(array,process,context){
	setTimeout(function(){
		var item = array.shift();
		process.call(context,item);

		if(array.length > 0){
			setTimeout(arguments.callee,100)
		}
	})
}

chunk([1,2,3,4,5],function(item){
	console.log(item)
})

//函数节流

var processor = {
	timeoutId:null,
	i:0,
	performProcessing:function(){
		this.i += 1
		console.log(this.i)
	},
	process:function(){
		clearTimeout(this.timeoutId)
		var that = this
		this.timeoutId = setTimeout(function(){
			that.performProcessing()
		},100)
	}
}



function throttle(method,context){
	clearTimeout(method.timerId)
	method.timerId = setTimeout(function(){
		method.call(context)
	},100)
}

