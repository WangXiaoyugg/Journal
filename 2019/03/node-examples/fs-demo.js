// 练习使用 node 的 fs 模块，
// linux 一切皆文件，和文件系统交互的能力
const fs = require('fs')
const path = require('path')

// 读文件
// fs.readFile('./readme.md', (err, data) => {
// 	if(err) throw err
// 	console.log(data.toString())
// });
// try {
// 	console.log((fs.readFileSync('./readme.md')).toString())
// } catch(e) {
// 	console.log('read file error x', e)
// }

// 打开文件
// fs.open('./readme.md', 'w',(err, fd) => {
// 	var buf = Buffer.alloc(10);
// 	var offset = 0
// 	var len = buf.length
// 	var pos = 0

// 	fs.read(fd, buf, offset,len, pos, function  (err, bytes, buffer) {
// 		console.log('读取了' + bytes + "bytes")
// 		console.log(buf.slice(0, bytes).toString())


// 		fs.close(fd, () => {
// 			console.log('关闭成功')
// 		})
// 	})

// })


// 写文件


// 文件追加


// 目录的读写
// const files = [];
// const walk = function  (path) {
// 	fs.readdirSync(path).forEach((file) => {
// 		const newPath = path + '/' + file
// 		const stat = fs.statSync(newPath);

// 		if(stat.isFile()){
// 			if(/\.js/.test(file)) {
// 				files.push(file)
// 			}
// 		} else {
// 			walk(newPath)
// 		}
// 	})	
// }

// const result = walk(path.join(__dirname, '../../../../Journal'))
// console.log(files.join("\r\n"))

// 识别图片是否是png


// 中英文JSON合并工具
// 希望把a.json ，b.json 的内容合并写入到c.json
// try {
//   const a = fs.readFileSync('./data/a.json').toString();
//   const b = fs.readFileSync('./data/b.json').toString();
//   const c = Object.assign({}, JSON.parse(a), JSON.parse(b));
//   console.log('c', c);
//   fs.writeFileSync('./data/c.json', JSON.stringify(c), {flag:'w'});

// }catch (e) {
// 	console.log(e);
// }


// 中英文JSON合并工具 封装的代码,学会使用 reduce的API
const exsits = filePath => fs.existsSync(filePath);
const jsonPath = process.argv[2]


if(!jsonPath) {
	console.log('没有传json目录参数')
	process.exit(1)
}

const rootPath = path.join(process.cwd(), jsonPath)
console.log(rootPath);

const walk = (path) => {
	return fs.readdirSync(path)
	.reduce((files, file) => {
		const filePath = path + '/' + file
		const stat = fs.statSync(filePath);

		if (stat.isFile()) {
			if(/(.*)\.(json)/.test(file)) {
				return files.concat(filePath)
			}
		}
		
		return files;
	}, [])

}


const mergeFileData = () => {
	const files = walk(rootPath)
	console.log("files", files)
	if(!files.length) process.exit(2)

	const data = files
		.filter(exsits)
		.reduce((total, file) => {
			const fileData = fs.readFileSync(file);
			const basename = path.basename(file, ".json")
			let filejson

			try {
				filejson = JSON.parse(fileData)
			}catch(e) {
				console.log('读取出错', file)
				console.log(e)
			}

			total[basename] = filejson
			return total;
		}, {})		

	fs.writeFileSync('./data/d.json', JSON.stringify(data, null, 2));		

}

mergeFileData();
