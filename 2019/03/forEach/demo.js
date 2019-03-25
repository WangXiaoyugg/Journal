/**
 * 在Array.forEach 中的如何break
 */

 // 1. throw error
//  const BreakException = {}
//  try {
//     [1,2,3].forEach((v) => {
//         console.log(v)
//         if(v === 2) throw BreakException
//     })
//  }catch(e) {
//     console.log(e);
//     if(e !== BreakException) throw e;
//  }

// 2. empty loop and flag
// var breakFlag = false;
// [1,2,4].forEach((v) => {
//     if(breakFlag === true) {
//         return false;
//     }
//     if(v == 2) {
//         breakFlag = true;
//     }
//     console.log(v)
// })

// 3. empty loop and context
// [1,2,3].forEach((v) => {
//     if(this.breakFlag === true) {
//         return false;
//     }

//     if(v === 2) {
//         this.breakFlag = true
//     }
//     console.log(v)
// })

// 4. change array use concat and splice, hasProblem
// var array = [1, 2, 3, 4, 5];
// array.forEach(function(item, index) {
//     if (item === 2) {
//         array = array.concat(array.splice(index, array.length - index));
//     }
//     console.log(item); //只输出1,2,
// });
// console.log('arrry', array); // [1]

// 5. use every and some, some  return true break, every return false break;
var a = [1,2,3,4,5]
a.every((item,index, arr) => {
    console.log(item)
    if(item === 2) {
        return false;
    } else {
        return true;
    }
 })

 a.some((item, index, arr) => {
     console.log(item)
     if (item == 2) {
         return true
     } else {
         return false;
     }
 })

// 6. 实在不行就用for 循环