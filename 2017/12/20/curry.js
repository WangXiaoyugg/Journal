
// function sum(x,y){
// 	return x+y
// }

// function curry1(fn,p1){
// 	return function(p2){
// 		return fn.call(undefined,p1,p2)
// 	}
// }

// function curry2(fn){
// 	return function(p1){
// 		return function(p2){
// 			return fn.call(undefined,p1,p2)
// 		}
// 	}
// }


var abc = function(a,b,c){
	return [a,b,c]
}

// abc(1,2,3)

function curry(func,fixedParam){
	var funcLength = func.length;
	if(!Array.isArray(fixedParam)) fixedParam = [];

	return function(){
		var newParam = Array.prototype.slice.call(arguments);
		if( fixedParam.length + newParam.length < funcLength ){
			return curry.call(undefined,func,fixedParam.concat(newParam))
		}else {
			return func.apply(undefined,fixedParam.concat(newParam))
		} 
	}
}