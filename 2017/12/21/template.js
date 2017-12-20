
//正则去匹配 <% %> 里的变量进行替换 if-else 失效
const template = (
  '<div class="toast_wrap">' +
    '<div class="msg"><%text%></div>' +
    '<div class="tips_icon <%iconClass%>"></div>' +
  '</div>'
)


function templateEngine(source,data){
	var regex = /<%([^%>]+)%>/g
	if(!data) return source

	return source.replace(regex,(match,key) => {
		console.log('match',match,'key',key)
		return data[key] ? data[key]:''
	})
}

templateEngine(template,{
	text:'hello',
	iconClass:'warn'
})

// 简单优雅，es6模板语法 if-else 失效

const data = {
	text:'hello',
	iconClass:'warn'
}

const template = 
  `<div class="toast_wrap">
	  <div class="msg">${data.text}</div>
	  <div class="tips_icon ${data.iconClass}"></div>
  </div>`

  // 简单的模版引擎

  var template = (
  'I hava some menu lists:' +
  '<% if (lists) { %>' +
    '<ul>' +
      '<% for (var index in lists) { %>' +
        '<li><% lists[i].text %></li>' +
      '<% } %>' +
    '</ul>' +
  '<% } else { %>' +
    '<p>list is empty</p>' +
  '<% } %>'
)

// 散在各处的 HTML 片段 push 到一个数组 html，通过 html.join('') 拼接成最终的模板

const html = []
html.push('I hava some menu lists:')
if(lists){
	html.push('<ul>')
	for (var index in lists){
		html.push('<li>')
		html.push(lists[i].text)
		html.push('</li>')
	}
	html.push('</ul>')
}else{
	html.push('<p>list is empty</p>')
}

// const re = /<%(.+?)%>/g

const regex_data = /<%([^%>]+)%>/g
const regex_js = /^( )?(var|if|for|else|switch|case|break|;) )(.*)?/g
const code = 'var r=[];\n'
let cursor = 0;
let result = null;
let match = null;

const add = (line,js) => {
	if(js){
		 // 处理 `<%%>` 中的内容，
		code += line.match(regex_js) ? line +' \n' : 'r.push('+ line +');\n'
	}else{
		// 处理 `<%%>` 外的内容
		code += line !== '' ? 'r.push("'+line.replace(/"/g,'\\"')+'");\n': ''
	}
	return add;
}

// 循环找出所有的 <%%> 
while (match = re.exec(template)){
	add(template.slice(cursor,match.index))(match[1],true)
	cursor = match.index + match[0].match
}

// 处理最后一个<%%>之后的内容
add(template.substr(cursor,template,length - cursor))
code = (code + 'return r.join("");}').replace(/[\r\t\n]/g,' ')


//调用方式，把字符串执行
new Function(code).apply(data)

let code = 'with(obj){}'

new Function('obj',code).apply(data,[data])
