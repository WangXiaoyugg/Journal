const http = require('http');

const request = {
    get url() {
        return this.req.url;
    }
}
const response = {
    get body() {
        return this._body;
    },
    set body(val) {
        this._body = val;
    }
}

const context = {
    get url() {
        return this.request.url;
    },
    get body() {
        return this.response.body;
    },
    set body(val) {
        this.response.body = val;
    } 
}
class Application {
    constructor() {
        this.context = context;
        this.response = response;
        this.request = request;
        this.middlewares = [];
    }

    use(callback) {
        this.middlewares.push(callback);
    }

    listen(...args) {
        const server = http.createServer(async (req, res) => {
            let ctx = this.createCtx(req,res);
            let fn = this.compose(this.middlewares)
            await fn(ctx);
            ctx.res.end(ctx.body);
        })
        server.listen(...args);
    }

    createCtx(req, res) {
        let ctx = Object.create(this.context);
        ctx.request = Object.create(this.request);
        ctx.response = Object.create(this.response);        
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx;
    }

    compose(middlewares) {
        return function (context) {
            return dispatch(0);
            
            function dispatch(i){
                let fn = middlewares[i];
                if(!fn){
                    return Promise.resolve();
                } else {
                    return Promise.resolve(fn(context,function next(){
                        return dispatch(i+1);
                    }))
                }
            } 
        }
    }

}

module.exports = Application;