
// 使用net模块测试端口是否可用

/**
 *  getPort([options])
	Returns a Promise for a port number.

	options
	Type: Object

	port
	Type: number | number[]

	A preferred port or an array of preferred ports to use.

	host
	Type: string

	The host on which port resolution should be performed. Can be either an IPv4 or IPv6 address.
 */


'use strict';
const net = require('net');

const isAvailable = options => new Promise((resolve, reject) => {
	// 创建一个服务器实例
	const server = net.createServer();
	// server.unref()
	// 如果当前系统是事件系统中唯一一个活动的服务器，调用 unref 将允许程序退出。如果服务器已被 unref，则再次调用 unref 并不会产生影响。
	// 执行unref.是为了确保上次连接无论是否关闭成功，强制关闭，不影响下一次连接
	server.unref();
	// 出现错误，直接reject。不在执行
	server.on('error', reject);
	// options 是空对象， server 就会随机一个任意端口监听
	// 尝试监听传入的端口号
	server.listen(options, () => {
		// server.address() => { port: 12346, family: 'IPv4', address: '127.0.0.1' }
		const {port} = server.address();
		// 监听成功的回调 关闭server, 然后resolve成功的回调
		server.close(() => {
			resolve(port);
		});
	});
});


// 复习一遍
// const isAvailable = options => new Promise((resolve, reject) => {
// 	const server = net.createServer()
// 	server.unref()
// 	server.on("error", reject)
// 	server.listen(options, () => {
// 		const {port} = server.address()
// 		server.close(() => {
// 			resolve(port);
// 		})
// 	})
// })

// const getPort = options => {
// 	options = Object.assign({}, options)

// 	if(typeof options.port === 'number') {
// 		options.port = [options.port]
// 	}
// 	if(!options.port) options.port = []
	
// 	return options.port.reduce(
// 			(seq, port) => seq.catch(
// 				() => isAvailable(Object.assign({}, options, {port}))
// 			)
// 		, Promise.reject())		
// }


// module.exports = options => options ?
// 	getPort(options).catch(() => getPort(Object.assign({}, options, {port: 0}))):
// 	getPort({port: 0})


// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
const getPort = options => {
	options = Object.assign({}, options);
	
	// 把number变成数组，适配数组的reduce的方法		
	if (typeof options.port === 'number') {
		options.port = [options.port];
	}
	// if(!options.port) options.port = [];
	
	// reduce
	return (options.port || []).reduce(
		(seq, port) => seq.catch(

			() => {
				console.log(console.log(seq, port);)

				return isAvailable(Object.assign({}, options, {port}))
			}
		),
		Promise.reject()
	);
};



module.exports = options => options ?
	getPort(options).catch(() => getPort(Object.assign(options, {port: 0}))) :
	getPort({port: 0});

module.exports.default = module.exports;
