const _ = require('./util.js')

const array = [1,2,4,3,5,6,7]
const obj = {a:1, b:2, c:3}

const people = [
	{
		firstname: "aa",
		lastname: "cc",
	},
	{
		firstname: "bb",
		lastname: "aa",
	},
	{
		firstname: "cc",
		lastname: "bb",
	},
]

// _.forEach(array, (item, index, arr) => {
// 	console.log(item, index, arr);
// })

// _.forEachObj(obj, (key, value, o) => {
// 	console.log(key, value, o);
// })


// _.forEach(array, (number) => {
// 	_.unless(number % 2 === 0, () => {
// 		console.log(number, " is odd");
// 	})
// })

// _.times(100, (n) => {
// 	_.unless(n % 2, () => {
// 		console.log(n, " is even")
// 	})
// })

// console.log(_.every([NaN,NaN, NaN], isNaN))
// console.log(_.every([NaN,1, NaN], isNaN))

// console.log(_.some([NaN, 4, NaN], isNaN))
// console.log(_.some([1,3,4], isNaN))

// console.log(people.sort(_.sortBy("firstname")))
// console.log(people.sort(_.sortBy("lastname")))

// _.tap("fun")((it) => console.log("value is ", it));
// _.forEach([1,2,3,4], (item, index, arr) => {
// 	_.tap(item)(() => {});
// })

// let r1 = ['1','2','3'].map(_.unary(parseInt))
// let r2 = ['1','2','3'].map(parseInt)
// console.log('r1: ', r1)
// console.log('r2: ', r2)

// let doPayment = _.once(() => {
// 	console.log("Payment is done: ")
// })
// doPayment()
// doPayment();

// let fastFactorial = _.memoized((n) => {
// 	if(n === 0) return 1;
// 	return n * fastFactorial(n - 1)
// })

// console.log(fastFactorial(5))
// console.log(fastFactorial(3))
// console.log(fastFactorial(7))

// let apressBooks = [
// 	{
// 		id: 1,
// 		title: 'A-test',
// 		author: 'A',
// 		rating: [4.7],
// 		reviews: [
// 			{good: 4, excellent: 12}
// 		]
// 	},
// 	{
// 		id: 2,
// 		title: 'B-test',
// 		author: 'B',
// 		rating: [4.5],
// 		reviews: [
		
// 		]
// 	},
// 	{
// 		id: 3,
// 		title: 'C-test',
// 		author: 'C',
// 		rating: [4.0],
// 		reviews: []
// 	},
// 	{
// 		id: 4,
// 		title: 'D-test',
// 		author: 'D',
// 		rating: [4.2],
// 		reviews: [
// 			{good: 14, excellent: 12}
// 		]
// 	},
// ]

// let res3 = _.map(apressBooks, (book) => {
// 	return {title: book.title, author: book.author}
// })
// console.log('res3: ', res3)

// let res4 = _.filter(apressBooks, (book) => book.rating[0] > 4.5)
// console.log("res4: ", res4)

// 获取rating 在4.5以上的book的影片名称和作者 
// let res4 = _.map(_.filter(apressBooks, (book) => book.rating[0] > 4.5), (book) => {
// 	return {title: book.title, author: book.author}
// })
// console.log("res4: ", res4);

let bpressBooks = [
	{
		name: 'beginners',
		bookDetails: [
			{
				id: 1,
				title: 'A-test',
				author: 'A',
				rating: [4.7],
				reviews: [
					{good: 4, excellent: 12}
				]
			},
			{
				id: 2,
				title: 'B-test',
				author: 'B',
				rating: [4.5],
				reviews: [
				
				]
			},
		]

	},
	{
		name: "pro",
		bookDetails: [
			{
				id: 3,
				title: 'C-test',
				author: 'C',
				rating: [4.0],
				reviews: []
			},
			{
				id: 4,
				title: 'D-test',
				author: 'D',
				rating: [4.2],
				reviews: [
					{good: 14, excellent: 12}
				]
			},

		]
	}
	
]

// const a = [[[1,2,3]], 4,5,6]
// console.log('a: ', _.concatRecursive(a))

// let goodRating = (book) => book.rating[0] > 4.5;
// let res4 = _.filter(
// 	_.concatAll(
// 		_.map(bpressBooks, (book) => {
// 			return book.bookDetails
// 		})
// 	)
// , goodRating)
// console.log("res4: ", res4);

// let res5 = _.reduceEasy([1,2,3,4,5], (acc, val) => acc + val);
// console.log("res5: ", res5);
// let res6 = _.reduceEasy([1,2,3,4,5], (acc, val) => acc * val);
// console.log("res6: ", res6);
// let res7 = _.reduce([1,2,3,4,5], (acc, val) => acc * val);
// console.log("res7: ", res7);
// let res8 = _.zip([1,2,3], [1,2,3], (x, y) => x *y);
// console.log("res8: ", res8);

// const add = (x, y) => x + y;
// const addCurried =  x => y => x + y;
// console.log(addCurried(4)(4))

// let autoCurriedAdd = _.curry1(add)
// console.log(autoCurriedAdd(2)(2))

let multi = (x,y,z,a) => x * y * z * a;
// console.log(_.curry2(multi)(1,2,3))
console.log(_.curry3(multi)(1)(2)(3)(4))

// 在数组中查找数字
// let arr = ['1', 'js','haha']
// let match = _.curry3(function(expr, str){
// 	return str.match(expr);
// })
// let filter = _.curry3(function(fn, ary){
// 	return ary.filter(fn);
// })
// let hasNumber = match(/\d+/g);
// let findNumberInArray = filter(hasNumber);
// console.log(findNumberInArray(arr));

// 求数组的平方
// let square = (array) => array.map(x => x * 2);
// let third = (array) => array.map(x => x * x * x);
// let map = _.curry3(function(fn, ary) {
// 	return ary.map(fn);
// })
// let sqareAll = map(x => x * x);
// let thirdAll = map(x => x * x * x);
// console.log(sqareAll([1,3,4]))
// console.log(thirdAll([1,3,4]))

// setTimeout(() => console.log("hello"), 10);
// setTimeout(() => console.log("world"), 10);
// let setTimeoutWrapper = (fn, time) => {
// 	return setTimeout(time, fn);
// }
// let delay10Ms = _.curry3(setTimeoutWrapper)(10);
// delay10Ms(() => console.log("hello"))
// delay10Ms(() => console.log("world"))
// let delay20Ms = _.partical(setTimeout, undefined, 10);
// delay20Ms(() => console.log("world"));

// let o = {foo: 'bar', bar: "foo"}
// let prettyJSON = _.partical(JSON.stringify, undefined, null, 8);
// console.log(prettyJSON(o));

