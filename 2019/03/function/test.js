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

let fastFactorial = _.memoized((n) => {
	if(n === 0) return 1;
	return n * fastFactorial(n - 1)
})

console.log(fastFactorial(5))
console.log(fastFactorial(3))
console.log(fastFactorial(7))





