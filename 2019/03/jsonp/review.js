// jsonp 详解 https://www.jianshu.com/p/e1e2920dac95
module.exports = jsonp
const debug = console.log

const count = 0;
const prefix = '__jb';
function noop() {};

function jsonp(url, opts, fn) {
    if(typeof opts === 'function') {
        fn = opts
        opts = {}
    }
    if(!opts)  opts = {}

    var prefix = opts.prefix || prefix;
    var id = opts.name || (prefix + (count++))
    var timeout = opts.timeout != null ? opts.timeout : 60000;
    var param = opts.param || 'callback'
    var enc = encodeURIComponent;

    var script;
    var timer;
    var target = document.getElementsByTagName('script')[0] || document.head

    if(timeout) {
        timer = setTimeout(function() {
            cleanup()
            fn && fn(new Error('Timeout'), null);
        }, timeout)
    }

    window[id] = function(data) {
        debug("jsonp got data", data);
        cleanup();
        fn && fn(null,data)
    }

    function cleanup() {
        if(script.parentNode) {
            script.parentNode.removeChild(script)
        }
        window[id] = noop;
        timer && clearTimeout(timer)
    }

    function cancel() {
        window[id] && cleanup()
    }

    debug("jsonp req %s", url);
    // 处理url 
    url = (~url.indexOf('?') ? "&" : "?") + parme + "=" + enc(id)
    url = url.replace("?&", "?");

    script = document.createElement('script')
    script.src = url;
    target.parentNode.insertBefore(script, target);

    return cancel
}
