const Router = require("koa-router")

// var url = Router.url('/users/:id', {id: 1});
// // => "/users/1"
// console.log(url);

const url = Router.url('/users/:id', {id: 1}, {query: { active: true }});
console.log(url);

