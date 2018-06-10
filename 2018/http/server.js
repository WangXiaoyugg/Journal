const http = require('http')
const fs = require('fs')
const url = require('url')
const crypto = require('crypto')
const port = process.argv[2] || 3000

const session = {

}

function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
}

const server = http.createServer((req, res) => {
    let method = req.method;
    let parsedUrl = url.parse(req.url, true)
    let path = parsedUrl.pathname;
    let query = parsedUrl.query; // obj

    console.log(`访问路径: ${path}`)

    let cookie = req.headers['cookie']

    
    let login = false;
    if(cookie) {
        let sessionId = cookie.split('=')[1];
        if(session[sessionId] && session[sessionId].login) {
            login = true
        } else {
            login = false
        }
    }
    


    let html = `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
                <link rel="stylesheet" href="/style"/>
                <title>首页</title>
            </head>
            <body>
                <h1>{{A}}</h1>
                <form action="/login" method="GET">
                    <input type="password" name="password" />
                    <input type="submit"/>
                </form>
                <script src='/script'></script>
            </body>
            </html>
    `
    if(login) {
        html = html.replace('{{A}}', '你好, 登录用户')
    } else {
        html = html.replace('{{A}}', '你好')
    }

    if(path === '/') {
        res.setHeader('Content-Type','text/html;charset=utf-8')
        res.write(html)
        res.end()

    } else if (path === '/style') {
        res.setHeader('Content-Type', 'text/css;charset=utf-8')
        res.setHeader('Cache-Control', 'max-age=60')
        res.end('h1 {color: red}')
    } else if (path === '/script') {
        
        let js = fs.readFileSync(__dirname+'/script.js','utf-8');
        let ifNoneMatch = req.headers['if-none-match']
        let Etag = md5(js);

        if(ifNoneMatch === Etag) {
            res.statusCode = 304
            res.end();
        } else {
            res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
            res.setHeader('Etag', Etag)
            res.end(js)
        }

    } else if (path === '/login') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        let sessionId = Math.random();
        session[sessionId] = {
            login: true
        }

        if(query.password === 'garen') {
            res.setHeader('Set-Cookie', `sid=${sessionId}`);
            res.end()
        } else {
            res.end('非法用户, 滚')
        }

    } else if (path === '/logout') {
        let date = new Date(0);
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.setHeader('Set-Cookie', `login=true;Expires=${date.toGMTString()}`);
        res.end()
    } 
    
    else {
        res.setHeader('Content-Type', 'text/plain;charset=utf-8')
        res.end('404 Not Found')
    }


    // if(path === '/1'){
    //     res.setHeader('Content-Type','text/css;charset=utf-8')
    //     res.end('body{margin: 0 ; padding:0; color: red}')
    // } else if (path === '/2') {
    //     res.setHeader('Content-Type','application/javascript;charset=utf-8')
    //     res.end('alert(1)')
    // } else if (path === '/3') {
    //     res.setHeader('Content-Type','text/html;charset=utf-8')
    //     res.end(`<!DOCTYPE html>
    //             <html>
    //             <head>
    //                 <link rel="stylesheet" href="/1" />
    //             </head>
    //             <body>
    //                 123
    //                 <script src='/2'></script>
                    
    //                 <script>
    //                     // var request = new XMLHttpRequest()
    //                     // request.open('GET', '/4')
    //                     // request.onload = function(){
    //                     //     console.log(request.responseText)
    //                     // }
    //                     // request.send()

    //                     window.jsonp = function(data) {
    //                         console.log(data);
    //                     }
    //                     setTimeout(() => {
    //                         var script = document.createElement('script')
    //                         script.src = '/5'
    //                         script.type = 'application/javascript'
    //                         document.body.appendChild(script)
    //                     },1000)
    //                 </script>
    //             </body>
    //             </html>`)
    // } else if (path === '/4') {
    //     res.end('{"name": "garen"}')
    // } else if (path === '/5') {
    //     res.end('jsonp({"data":{"name":"garen"}})')
    // }

    // if(path === '/') {
    //     res.statusCode = 200
    //     res.setHeader('Content-Type', 'text/html;charset=utf-8')
    //     res.write('首页')
    //     res.end()
    // }  else {
    //     res.statusCode = 404
    //     res.setHeader('Content-Type', 'text/html;charset=utf-8')        
    //     res.write('找不到')
    //     res.end()
    // }

})


server.listen(port, () => {
    console.log(`server is start at localhost: ${port}`)
})