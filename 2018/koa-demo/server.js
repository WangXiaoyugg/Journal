const Koa = require('koa')
const KoaLog = require('./koa-log')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/', (ctx, next) => {
    ctx.body = '孙悟空'
    next()
})

router.get('/zhubajie', (ctx, next) => {
    ctx.body = '猪八戒'
    next()
})

app.use(KoaLog)
app
  .use(router.routes())
  .use(router.allowedMethods())


// function delay() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve()
//         },1000)
       
//     })
// }


// app.use(async(ctx, next) => {
//     ctx.body = '1 '
//     // console.log(ctx);
//     if(ctx.request.url == '/') {
//         ctx.body = '孙悟空'
//     } else if ( ctx.request.url == '/zhubajie') {
//         ctx.body = '猪八戒'
//     } else {
//         ctx.body = '<h1>Not Found</h1>'
//     }
//     await delay()
//     await next()
//     ctx.body += '2 '
// })

// app.use(async(ctx, next) => {
//     ctx.body += '3 '
//     await delay()
//     await next()
//     ctx.body += '4 '
// })

// app.use(async(ctx, next) => {
//     ctx.body += '5 '
//     await delay()
//     await next()
//     ctx.body += '6 '
// })

app.listen(3000, () => {
    console.log('server is listen at localhost:3000')
})