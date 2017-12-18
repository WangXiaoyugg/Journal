function Promise(fn){
	var status = 'pending'		
	function successNotify(){
		status = 'resolved'
		toDoThen.apply(undefined,arguments)
	}

	function failNotify(){
		status = 'rejected'
		toDoThen.apply(undefined,arguments)
	}
	function toDoThen(){
		setTimeout(()=>{
			if(status === 'resolved'){
				for(let i=0;i<successArray.length;i++){
					successArray[i].apply(undefined,arguments)
				}
			}else if(status === 'rejected'){
				for(let i=0;i<failArray.length;i++){
					failArray[i].apply(undefined,arguments)
				}
			}
		})
		
	}

	var successArray = []
	var failArray = []

	fn.call(undefined,successNotify,failNotify)
	return {
		then:function(successFn,failFn){
			successArray.push(successFn)
			failArray.push(failFn)
			return undefined //简化
		}
	}
}


var promise = new Promise(function(x,y){
	setTimeout(() => {
		x(100)
	},3000)
})

promise.then((z)=>{
	console.log(z)
},(w) => {
	console.log(w)
})