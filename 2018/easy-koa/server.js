const Koa = require('./application');

const app = new Koa();

function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 2000)
    })
}

app.use(async(ctx, next) => {
    ctx.body = '1'
    await next();
    ctx.body += '2';
    console.log(ctx.body);
})

app.use(async(ctx, next) => {
    ctx.body += '3'
    await delay();
    await next();
    ctx.body += '4'
})

app.use(async(ctx, next) => {
    ctx.body += '5'
})

app.listen(9000, () => {
    console.log('server is listen at localhost:9000')
})