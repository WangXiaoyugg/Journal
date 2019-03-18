// jsonp 源码解析
// https://github.com/webmodules/jsonp/blob/master/index.js

module.exports = jsonp

// callback index;
var count = 0;

// 等待函数
function noop () {}

/**
 * JSONP handler
 *
 * Options:
 *  - param {String} qs parameter (`callback`)
 *  - prefix {String} qs parameter (`__jp`)
 *  - name {String} qs parameter (`prefix` + incr)
 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
 *
 * @param {String} url
 * @param {Object|Function} optional options / callback
 * @param {Function} optional callback
 */

function jsonp(url, opts, fn) {
     // 如果不传第三个参数的处理
     if(typeof opts  === 'function') {
         fn = opts;
         opts = {};
     }

     if (!opts) opts = {}
     
     var prefix = opts.prefix || '__jp';

    // use the callback name that was passed if one was provided.
    // otherwise generate a unique name by incrementing our counter.
    var id = opts.name || (prefix + (count++))

    var param = opts.param || 'callback'
    var timeout = null != opts.timeout ? opts.timeout : 60000;
    
    var enc = encodeURIComponent;
    var target = document.getElementsByTagName('script')[0] || document.head;
    var script;
    var timer;

    if(timeout) {
        timer = setTimeout(function() {
            cleanup()

            // 超时处理报错
            if(fn) fn(newError('Timeout'))
        }, timeout)
    }

    function cleanup() {
        // 清除的script标签的时候，此时script标签已经插入，
        // 让script的父元素删除它即可
        if(script.parentNode) {
            script.parentNode.removeChild(script)
        }
        window[id] = noop; // 重置 id 为 空函数
        if(timer) clearTimeout(timer) // 清理定时器
    }

    // 把挂载window的id 属性对应的script给干掉
    function cancel() {
        if(window[id]){
            cleanup();
        }
    }

    // 核心处理逻辑， 往window 上挂载一个函数
    window[id] = function(data) {
        console.log("jsonp got", data)
        cleanup();
        // 第二个参数才能获取data
        if(fn) fn(null, data)
    }

    // 拼接查询参数, 处理一些url的异常
    url +=  (~url.indexOf('?') ? '&' : "?") + param + "=" + enc(id);
    url = url.replace("?&", "?")

    console.log('jsonp req "%s"', url);

    // 具体jsonp 操作
    script = document.createElement('script')
    script.src = url;
    // 在html头部或者body中插入script标签
    target.parentNode.insertBefore(script, target)

    return cancel;

}

