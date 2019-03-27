// parseInt API 接受两个参数 parseInt(string, radix);
// radix表示进制, 一个介于2和36之间的整数(数学系统的基础)
/**
 * ['1', '2', '3'].map(parseInt) 做了什么？
 * Array.map((item, index) => {});
 * 把item, index 传入 parseInt 执行并返回
 * 第一次迭代 parseInt('1', 0) => 1; 好奇返回1
 * 第二次迭代 parseInt("2", 1) => NaN; 没有1进制
 * 第三次迭代 parseInt("3", 2) => NaN; 2机制只有0，1，没有3 所以转换失败
 */
// unary 的作用是把 接受多个参数的函数，变成只接受一个参数的函数
function unary(fn) {
	// 传入的函数的参数长度是1， 直接返回传入的fn
	if(fn.length === 1) {
		return fn;
	} else {
		// 如果传入的fn接受多个参数，就只取第一个参数，并返回一个函数并执行
		// 这样 包装后的parseInt只会接受 item, 不会接受radix, 
		// 默认以10进制转化，当然能转换成功
		return function (arg) {
			return fn(arg)
		}
	}

}