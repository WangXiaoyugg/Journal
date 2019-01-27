/**
 * 检查是否是回文
 * 1. 使用正则去处不想要的字符
 * 2. 使用 Array.prototype.slice,Array.prototype.join
 * 3. 使用 String.prototype.toLowerCase 把字符串小写
 */

/* 	

\W	
匹配一个非单字字符。
等价于[^A-Za-z0-9_]。

*/

// 基本解法
function basic_palindrome (str) {
	return str.replace(/[\W_]/g, '').toLowerCase() ===
		   str.replace(/[\W_]/g, '').split('').reverse().join('')	
}


// 中级解法
function intermediate_palindrome (str) {
	str = str.toLowerCase().replace(/[\W_]/g, '')
	for(var i = 0, len = str.length - 1; i < len / 2; i++) {
		if(str[i] !== str[len - 1]) {
			return false;
		}
	}
	return true;
}

// 高级解法
function advance_palindrome (str) {
	let front = 0;
	let back = str.length - 1

	while (back > front) {
		if(str[front].match(/[\W_]/)) { // 不是在[A-Za-z0-9] 跳过
			front++
			continue
		}

		if(str[back].match(/[\W_]/)) { // 不是在[A-Za-z0-9] 跳过
			back--
			continue
		}

		// 前后相同指针对应的字符不同返回false	
		if(str[front].toLowerCase() !== str[back].toLowerCase()) return false;
		front++
		back--
	}

	// 一轮遍历都没有不同， 返回true
	return true;
}
