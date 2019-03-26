const Koa = require('./application.js');
const app = new Koa();

// logger
app.use(async (ctx, next) => {
  console.log('第一层开始:')  
  await next();
  const rt = ctx['X-Response-Time'];
  console.log(`${ctx.req.method} ${ctx.req.url} - ${rt}`);
  console.log('第一层结束:')  
});

// x-response-time
app.use(async (ctx, next) => {
  console.log("第二层开始:")
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx['X-Response-Time'] = `${ms}ms`;
  console.log("第二层结束:")

});

// response
app.use(async ctx => {
  console.log("第三层开始:")
  ctx.res.end('This is like koa2');
  console.log("第三层结束:")

});

app.listen(8000);