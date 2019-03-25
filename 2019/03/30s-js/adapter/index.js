const ary = (fn, n) => (...args) => fn(...args.slice(0, n));

// const firstTwoMax = ary(Math.max, 2);
// const res = [[2,6,'a'], [8,4,6], [10]].map(x => firstTwoMax(...x))
// console.log(res);

const call = (key, ...args) => context => {
	console.log('context', context);
	console.log('context[key]', context[key]);
	console.log('...args', ...args);

	return context[key](...args)
};

// Promise.resolve([1,2,3])
// 	.then(call('map', x => 2* x))
// 	.then(console.log) //[2,4,6]
// const map = call.bind(null, 'map')
// console.log("map", map);
// Promise.resolve([1,2,3])
// 	.then(map(x => 2 * x))
// 	.then(console.log)

const collectInto = fn => (...args) => {
	return fn(args)
};
// console.log("Promise.all: ", Promise.all);
// const Pall = collectInto(Promise.all.bind(Promise));
// let p1 = Promise.resolve(1);
// let p2 = Promise.resolve(2);
// let p3 = new Promise(resolve => setTimeout(resolve, 2000, 3));
// Pall(p1, p2, p3).then(console.log); 

// 反转参数传入的顺序，
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
const flip = fn => (first, ...rest) => fn(...rest, first);
// let a = {name: "johh Smith"}
// let b = {name: 'garen'}
// const mergeFrom = flip(Object.assign);
// console.log(mergeFrom(a, b));
// b = {name: 'garen'};
// console.log(Object.assign(a, b)); // 后面的覆盖前面的

const over = (...fns) => (...args) => {
	console.log("args: ", args);
	return fns.map(fn => fn.apply(null, args))
}
// const minMax = over(Math.max, Math.min);
// console.log("min max: ",minMax(1,2,3,4,5));

const overArgs = (fn, transforms) => (...args) => fn(...args.map(
 (val, i) => transforms[i](val)
))
// const square = n => n * n;
// const double = n => n * 2;
// const fn = overArgs((x,y) => [x, y], [square, double])
// console.log(fn(9, 3)); // [81, 6]

const pipeAsyncFunctions = (...fns) => arg => fns.reduce(
	(p, f) => p.then(f), 
	Promise.resolve(arg)
);
// const sum = pipeAsyncFunctions(
//   x => x + 1,
//   x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
//   x => x + 3,
//   async x => (await x) + 4
// );

// (async () => {
//   console.log(await sum(5)); // 15 (after one second)
// })();

const pipeFunction = (...fns) => fns.reduce(
	(f,g) => {
		console.log("f", f);
		console.log("g", g);
		return (...args) => {
			console.log("f1", f)
			console.log('args', ...args);
			console.log('f args: ', f(...args))
			console.log("g", g)
			console.log("g f args" ,g(f(...args)));
			return g(f(...args))
		}
	}
);

// const add5 = x => x + 5;
// const multiply = (x, y) => x *y;
// const multiplyAndAdd5 = pipeFunction(multiply, add5);
// multiplyAndAdd5(5, 2); // 15;

const promisify = func => (...args) => {
	return new Promise(
		(resolve, reject) => func(
			...args, 
			(err, result) => (
				err ? reject(err) : resolve(result)
			)
		) 
	)
}
const delay = promisify((d, cb) => setTimeout(cb, d));
//delay (...args) => return new Promise();
console.log("delay: ", delay);
delay(2000).then(() => {
	console.log("hi");
})


const rearg = (fn, indexes) => 
	(...args) => fn(...indexes.map(
		i => args[i]
	));
// var rearged = rearg(
// 	function(a,b,c) {
// 		return [a,b,c]
// 	},
// 	[2,0,1]
// )
// console.log(rearged('b', 'a', 'c'));


const spreadOver = fn => argsArr => fn(...argsArr)
// const arrayMax = spreadOver(Math.max);
// const arrayMin = spreadOver(Math.min);
// console.log(arrayMax([1,2,3,5,6]))
// console.log(arrayMin([1,4,6,7,-1]))

const unary = fn => val => fn(val);
// unary(parseInt) 返回的是 val => parseInt(val);
// map(val => parseInt(val));
// const res1 =['6','8', '10'].map(unary(parseInt));
// console.log("res1", res1)


