// \uFEFF就是位序掩码（名为<BOM>）,就是空白字符的用途！
// \uFEFF ES5 新增的空白符，叫「字节次序标记字符（Byte Order Mark）」，也就是前面提到的 BOM
// \xA0 禁止自动换行空格符 ,其实质是 HTML 中经常用到的 &nbsp;


String.prototype.trim = function(){
	
	if(!String.prototype.trim){
		String.prototype.trim = function(){
			// reg = /^\s+|\s+$/g
			var regex = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
			return this.replace(regex,'')
		}
	}
};



String.prototype.trimLeft = function(){
	
	if(!String.prototype.trimLeft){
		String.prototype.trim = function(){
			// reg = /^\s+|\s+$/g
			var regex = /^[\s\uFEFF\xA0]+/g
			return this.replace(regex,'')
		}
	}
};

String.prototype.trimRight = function(){
	
	if(!String.prototype.trimRight){
		String.prototype.trimRight = function(){
			// reg = /^\s+|\s+$/g
			var regex = /[\s\uFEFF\xA0]+$/g
			return this.replace(regex,'')
		}
	}
};