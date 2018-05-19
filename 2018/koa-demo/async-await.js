// function ajax(fn){
//     setTimeout(() => {
//        console.log('hello')
//        fn()     
//     },1000)
// }

// 1. 回调地狱
// ajax(() => {
//     console.log('结束1')
//     ajax(() => {
//         console.log('结束2')
//         ajax(() => {
//             console.log('结束3')
//         })
//     })
// })

function delay(word) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('hello' + word)
        },1000)
       
    })
}

// 2. promise 形式
// delay('孙悟空')
//     .then((word) => {
//         console.log(word)
//         return delay('猪八戒')
//     })
//     .then((word) => {
//         console.log(word)
//         return delay('沙悟净')
//     })
//     .then((word) => {
//         console.log(word)
//     })

// 3. async await
async function start() {
    const word1 = await delay('孙悟空')
    console.log(word1)
    const word2 = await delay('猪八戒')
    console.log(word2)
    const word3 = await delay('沙悟净')
    console.log(word3)
}
start()